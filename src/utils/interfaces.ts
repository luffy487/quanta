export interface WalletContextProps {
    walletAddress: string;
    connectWallet: () => void;
}
export interface TokenInfo {
  symbol: string;
  name: string;
  apr: number;
  total: number;
  utilized: number;
  available: number;
  token: string;
}

export interface TokenSupplies {
  [token: string]: Supply[];
}

export interface TokenBorrows {
  [token: string]: Borrow[];
}

export interface Borrow {
  amount: number;
  timestamp: string;
  collateral: string;
  paid: boolean
}

export interface Supply {
  amount : number;
  timestamp : number;
  withdrawn : boolean;
}

export interface TokenProps {
  tokensInfo: TokenInfo[];
  handleSupplyClick: (token: string) => void;
}

export interface MyAssetsProps {
  tokenSupplies: TokenSupplies;
  tokenBorrows: TokenBorrows;
  withdraw: (token: string, amount: number) => void;
  repay: (token: string, index: number) => void;
}
