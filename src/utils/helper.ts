import Web3 from "web3";
const fetchWeb3 = () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    return web3;
  }
};

const fetchContract = (CONTRACT_ADDRESS: string, CONTRACT_ABI: any) => {
  const web3: any = fetchWeb3();
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  return contract;
};

const ETHtoWEI = (eth: number) => {
  return Number(eth) * 10 ** 18;
};
const WEItoETH = (wei: number) => {
  return Number(wei) / 10 ** 18;
};

const convertedDate = (timestamp: any) => {
  let date = new Date(Number(timestamp) * 1000);
  return date.toLocaleString();
};

export { fetchContract, fetchWeb3, ETHtoWEI, WEItoETH, convertedDate };
