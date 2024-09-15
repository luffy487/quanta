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
  timestamp: number;
  cToken: string;
  paid: boolean;
  interest : number;
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
