"use client";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  DEFI_ADDRESS,
  DEFI_ABI,
  TOKEN_ABI,
  FACTORY_ABI,
  FACTORY_ADDRESS,
  POOL_ABI,
} from "@/utils/constants";
import {
  fetchContract,
  ETHtoWEI,
  WEItoETH,
  convertedDate,
} from "@/utils/helper";
import { useWallet } from "./components/UI/WalletContextProvider";
import MySupplyAssets from "./components/UI/MySupplyAssets";
import SupplyAssets from "./components/UI/SupplyAssets";
import MyBorrowAssets from "./components/UI/MyBorrowAssets";
import BorrowAssets from "./components/UI/BorrowAssets";
import { toast } from "react-toastify";
import { TokenBorrows, TokenInfo, TokenSupplies } from "@/utils/interfaces";

const tokensNPoolsAddress: any = {};
let deFi: any, factory: any;
const tokenContracts: any = {},
  poolContracts: any = {};
const msInADay: number = 1000 * 60 * 60 * 24;
export default function Home() {
  const { walletAddress } = useWallet();
  const [balance, setBalance] = useState<any>({});
  const [tokensInfo, setTokensInfo] = useState<TokenInfo[]>([]);
  const [showSupply, setShowSupply] = useState<boolean>(false);
  const [showBorrow, setShowBorrow] = useState<boolean>(false);
  const [currentToken, setCurrentToken] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [buttonLoadingText, setButtonLoadingText] = useState<string>("");
  const [tokenBorrows, setTokenBorrows] = useState<TokenBorrows>({});
  const [tokenSupplies, setTokenSupplies] = useState<TokenSupplies>({});
  const [collateralToken, setCollateralToken] = useState<string>("");
  useEffect(() => {
    getNecessaryInfo();
  }, []);
  useEffect(() => {
    getUserInfo();
  }, [walletAddress]);
  const getNecessaryInfo = async () => {
    try {
      factory = fetchContract(FACTORY_ADDRESS, FACTORY_ABI);
      deFi = fetchContract(DEFI_ADDRESS, DEFI_ABI);
      const allTokens = await factory.methods.getAllTokens().call();
      await Promise.all(
        allTokens.map(async (token: string) => {
          const pool = await factory.methods.getTokenPoolAddress(token).call();
          tokenContracts[token] = fetchContract(token, TOKEN_ABI);
          poolContracts[pool] = fetchContract(pool, POOL_ABI);
          tokensNPoolsAddress[token] = pool;
        })
      );
      await Promise.all([getTokenInfo(), getUserInfo()]);
    } catch (err) {
      console.log("getNecessaryInfo", err);
    }
  };
  const getUserInfo = async () => {
    if (walletAddress) {
      await Promise.all([
        calculateBalance(),
        getTokenBorrows(),
        getTokenSupplies(),
      ]);
    }
  };
  const getTokenBorrows = async () => {
    try {
      const borrows: TokenBorrows = {};
      await Promise.all(
        Object.keys(tokenContracts).map(async (token: string) => {
          const tokenBorrows = await deFi.methods
            .getUserLoans(walletAddress, token)
            .call();
          borrows[token] = tokenBorrows.map((tBorrow: any) => {
            return {
              amount: tBorrow.amount,
              timestamp: tBorrow.timestamp,
              cToken: tBorrow.collateral,
              paid: tBorrow.paid,
              interest: tBorrow.interest,
            };
          });
        })
      );
      setTokenBorrows(borrows);
    } catch (err) {
      console.log("Err", err);
    }
  };
  const getTokenSupplies = async () => {
    try {
      const supplies: TokenSupplies = {};
      await Promise.all(
        Object.keys(tokenContracts).map(async (token: string) => {
          const tokenSupplies = await deFi.methods
            .getUserDeposits(walletAddress, token)
            .call();
          supplies[token] = tokenSupplies
            .filter((tSupply: any) => !tSupply.withdrawn)
            .map((tSupply: any) => {
              return {
                amount: tSupply.amount,
                timestamp: tSupply.timestamp,
                withdrawn: tSupply.withdrawn,
              };
            });
        })
      );
      setTokenSupplies(supplies);
    } catch (err) {
      console.log("getTokenSupplies", err);
    }
  };
  const getTokenInfo = async () => {
    try {
      const tokenInfo: TokenInfo[] = await Promise.all(
        Object.keys(tokensNPoolsAddress).map(async (token: string) => {
          const pool = poolContracts[tokensNPoolsAddress[token]];
          const tokenContract = tokenContracts[token];
          const [symbol, name, apr, total, utilized, available]: [
            string,
            string,
            number,
            number,
            number,
            number
          ] = await Promise.all([
            tokenContract.methods.symbol().call(),
            tokenContract.methods.name().call(),
            deFi.methods.currentInterest(token).call(),
            pool.methods.totalFund().call(),
            pool.methods.utilizedFund().call(),
            pool.methods.currentLiquidity().call(),
          ]);
          return {
            symbol: symbol,
            name: name,
            apr: apr,
            total: WEItoETH(total),
            utilized: WEItoETH(utilized),
            available: WEItoETH(available),
            token: token,
          };
        })
      );
      setTokensInfo(tokenInfo);
    } catch (err) {
      console.log("getTokenInfo", err);
    }
  };
  const calculateBalance = async () => {
    try {
      const balances: any = {};
      await Promise.all(
        Object.keys(tokenContracts).map(async (token: string) => {
          balances[token] = await tokenContracts[token].methods
            .balanceOf(walletAddress)
            .call();
        })
      );
      setBalance(balances);
    } catch (err) {
      console.log("calculateBalance", err);
    }
  };
  const borrow = async (amount: number) => {
    try {
      if (!amount) {
        toast.error("Please enter amount");
        return;
      }
      if (!collateralToken) {
        toast.error("Please select collateral asset");
        return;
      }
      const tokenInfo: any = tokensInfo.find(
        (tkn: TokenInfo) => tkn.token == currentToken
      );
      if (amount > tokenInfo.available) {
        toast.error("Please enter amount less than available");
        return;
      }
      setButtonLoading(true);
      setButtonLoadingText("Waiting for Approval");
      await tokenContracts[collateralToken].methods
        .approve(DEFI_ADDRESS, ETHtoWEI(amount * 1.5))
        .send({ from: walletAddress });
      setButtonLoadingText("Borrowing");
      await deFi.methods
        .borrow(currentToken, ETHtoWEI(amount), collateralToken)
        .send({ from: walletAddress });
      setButtonLoading(false);
      setShowBorrow(false);
      toast.success("Borrowed succesfully !");
      await getNecessaryInfo();
    } catch (err: any) {
      toast.error(err.message);
      setButtonLoading(false);
    }
  };
  const supply = async (amount: number) => {
    try {
      if (!amount) {
        toast.error("Please enter amount");
        return;
      }
      setButtonLoading(true);
      setButtonLoadingText("Waiting for Approval");
      await tokenContracts[currentToken].methods
        .approve(tokensNPoolsAddress[currentToken], ETHtoWEI(amount))
        .send({ from: walletAddress });
      setButtonLoadingText("Supplying");
      await deFi.methods
        .deposit(currentToken, ETHtoWEI(amount))
        .send({ from: walletAddress });
      setButtonLoading(false);
      setShowSupply(false);
      toast.success("Supplied succesfully !");
      await getNecessaryInfo();
    } catch (err: any) {
      toast.error(err.message);
      setButtonLoading(false);
    }
  };
  const repay = async (token: string, index: number) => {
    try {
      const amount = interest(tokenBorrows[token][index]);
      await tokenContracts[token].methods
        .approve(tokensNPoolsAddress[token], amount)
        .send({ from: walletAddress });
      await deFi.methods.repay(token, index).send({ from: walletAddress });
      toast.success("Repaid succesfully !");
      await getNecessaryInfo();
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  const interest = (info: any) => {
    const duration =
      (new Date().getTime() -
        new Date(convertedDate(info.timestamp)).getTime()) /
      msInADay;
    return (
      Number(info.amount) +
      (((duration / 365) * Number(info.interest)) / 100) * Number(info.amount)
    );
  };
  const withdraw = async (token: string, index: number) => {
    try {
      await deFi.methods.withdraw(token, index).send({ from: walletAddress });
      toast.success("Withdrawn succesfully !");
      await getNecessaryInfo();
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  const handleSupplyClick = (token: string) => {
    setCurrentToken(token);
    setShowSupply(true);
  };
  const handleBorrowClick = (token: string) => {
    const tokenInfo: any = tokensInfo.find(
      (tkn: TokenInfo) => tkn.token == token
    );
    if (!tokenInfo.available) {
      toast.warning("Unavailable Asset");
      return;
    }
    setCurrentToken(token);
    setShowBorrow(true);
  };

  const getToken = (token: string) => {
    return tokensInfo.find((tkn: TokenInfo) => tkn.token == token);
  };
  return (
    <div className="px-20 py-5">
      <div>
        <Card>
          <span className="text-customGreen">Wallet Balance</span>
          <div className="flex space-x-3 items-end py-1">
            {Object.keys(balance).map((token: string) => (
              <Card className="bg-customBlack rounded-lg px-4 py-2" key={token}>
                <span className="text-sm text-gray-400">
                  {getToken(token)?.name}
                </span>
                <span className="text-lg text-gray-500">
                  {WEItoETH(balance[token]) + " " + getToken(token)?.symbol}
                </span>
              </Card>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-5 flex justify-between space-x-3">
        <div className="space-y-3 flex-col w-full">
          <Card className="bg-customBlack p-2 rounded-lg">
            <CardHeader>Your Supplies</CardHeader>
            <CardBody>
              <MySupplyAssets
                tokenSupplies={tokenSupplies}
                withdraw={withdraw}
                getToken={getToken}
                interest={interest}
              ></MySupplyAssets>
            </CardBody>
          </Card>
          <Card className="bg-customBlack p-2 rounded-lg">
            <CardHeader>Assets to Supply</CardHeader>
            <CardBody>
              <SupplyAssets
                tokensInfo={tokensInfo}
                handleSupplyClick={handleSupplyClick}
              ></SupplyAssets>
            </CardBody>
          </Card>
        </div>
        <div className="space-y-3 flex-col w-full">
          <Card className="bg-customBlack p-2 rounded-lg">
            <CardHeader>Your Borrows</CardHeader>
            <CardBody>
              <MyBorrowAssets
                tokenBorrows={tokenBorrows}
                getToken={getToken}
                repay={repay}
                interest={interest}
              ></MyBorrowAssets>
            </CardBody>
          </Card>
          <Card className="bg-customBlack p-2 rounded-lg">
            <CardHeader>Assets to Borrow</CardHeader>
            <CardBody>
              <BorrowAssets
                tokensInfo={tokensInfo}
                handleBorrowClick={handleBorrowClick}
              ></BorrowAssets>
            </CardBody>
          </Card>
        </div>
      </div>
      {showSupply && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 p-6">
          <div className="bg-customBlack rounded-xl p-8 space-y-6 w-full max-w-md shadow-lg">
            <label>Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full bg-transparent border rounded-lg p-2 focus:border-customGreen"
              value={amount}
              onInput={(event: any) => setAmount(Number(event.target.value))}
            ></input>
            <div className="flex justify-end space-x-4">
              <Button
                className="border border-gray-400 text-gray-400 rounded-full px-4 py-2 hover:text-white hover:border-white transition-all duration-200"
                onClick={() => setShowSupply(false)}
              >
                Cancel
              </Button>
              <Button
                className="text-customGreen border border-customGreen rounded-full px-4 py-2"
                onClick={() => supply(amount)}
                isLoading={buttonLoading}
              >
                {!buttonLoading ? "Approve and Supply" : buttonLoadingText}
              </Button>
            </div>
          </div>
        </div>
      )}
      {showBorrow && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 p-6">
          <div className="bg-customBlack rounded-xl p-8 space-y-6 w-full max-w-md shadow-lg">
            <div className="space-y-2">
              <label>Amount</label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full bg-transparent border-gray-700 border-[0.5px] rounded-lg p-2 focus:border-customGreen"
                value={amount}
                onInput={(event: any) => setAmount(Number(event.target.value))}
              ></input>
            </div>
            <div>
              <label className="mt-2">Collateral Asset</label>
              <select
                className="w-full bg-transparent border rounded-lg p-2 focus:border-customGreen"
                onChange={(event: any) =>
                  setCollateralToken(event.target.value)
                }
              >
                <option value="" className="bg-customBlack p-2 text-gray-400">
                  Select Token
                </option>
                {tokensInfo
                  .filter((tkn: any) => tkn.token !== currentToken)
                  .map((token: any) => (
                    <option
                      key={token.token}
                      value={token.token}
                      className="bg-customBlack p-2"
                    >
                      {token.name} - {token.symbol}
                    </option>
                  ))}
              </select>
            </div>
            <input
              className="w-full bg-transparent border rounded-lg p-2 focus:border-customGreen"
              value={amount * 1.5}
              disabled
            ></input>
            <div className="flex justify-end space-x-4">
              <Button
                className="border border-gray-400 text-gray-400 rounded-full px-4 py-2 hover:text-white hover:border-white transition-all duration-200"
                onClick={() => setShowBorrow(false)}
              >
                Cancel
              </Button>
              <Button
                className="text-customGreen border border-customGreen rounded-full px-4 py-2"
                onClick={() => borrow(amount)}
                isLoading={buttonLoading}
              >
                {!buttonLoading ? "Approve and Borrow" : buttonLoadingText}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
