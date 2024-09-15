"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { WEItoETH, convertedDate } from "@/utils/helper";
import { Supply } from "@/utils/interfaces";
interface props {
  tokenSupplies: any;
  withdraw: (token: string, amount: number) => void;
  getToken: (token: string) => any;
  interest: (info: any) => number;
}
const MySupplyAssets: React.FC<props> = ({
  tokenSupplies,
  withdraw,
  getToken,
  interest,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableColumn className="text-sm text-gray-500">Asset</TableColumn>
        <TableColumn className="text-sm text-gray-500">Amount</TableColumn>
        <TableColumn className="text-sm text-gray-500">Interest</TableColumn>
        <TableColumn className="text-sm text-gray-500">Supplied at</TableColumn>
        <TableColumn className="text-sm text-gray-500">Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {Object.keys(tokenSupplies).map((token: string) =>
          tokenSupplies[token].map((supply: Supply, index: number) => (
            <TableRow
              key={token}
              className="border-y-[0.5px] border-gray-800 text-center"
            >
              <TableCell>{getToken(token)?.symbol}</TableCell>
              <TableCell>{WEItoETH(supply.amount).toFixed(2)}</TableCell>
              <TableCell>
                <Tooltip
                  content={
                    <div className="bg-black px-3 py-2 rounded-lg flex-row space-y-1">
                      <div className="text-sm text-gray-400">
                        Current Accured Amount
                      </div>
                      <div className="text-xs text-gray-500">
                        {WEItoETH(interest({ ...supply, interest: 5 }))}
                      </div>
                    </div>
                  }
                >
                  {"5%"}
                </Tooltip>
              </TableCell>
              <TableCell className="text-xs">
                {convertedDate(supply.timestamp)}
              </TableCell>
              <TableCell>
                <Button
                  className="px-3 py-1 rounded-full text-customGreen border border-customGreen"
                  onClick={() => withdraw(token, index)}
                >
                  Withdraw
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default MySupplyAssets;
