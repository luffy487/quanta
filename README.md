# Quanta - Decentralized Ethereum Lending and Borrowing Platform

Quanta is a decentralized platform built on the Ethereum blockchain that allows users to lend and borrow crypto assets. The platform supports four crypto tokens: **REACT**, **NODE**, **VUE**, and **NEXT**. Quanta ensures fair and simple interest rates, with fixed yields for lenders and a dynamic interest model for borrowers based on the platform's utilization rate.

## Key Features

- **Lend & Earn**: Lenders earn a fixed 5% annual yield on the assets they provide to the platform.
  
- **Borrow & Collateralize**: Borrowers can access liquidity by using any three of the supported tokens as collateral at a 150% ratio. Interest rates for borrowers are based on a combination of base interest and utilization rate.

- **Interest Calculation**: 
  - Borrowers pay interest calculated using a fixed base interest of 2%, plus an additional percentage determined by the platform's utilization rate. This dynamic rate ensures fair pricing based on asset demand.
  
- **Supported Tokens**: 
  - REACT, NODE, VUE, and NEXT tokens are the assets available for lending and borrowing, with equal value for each.

## Utilization Rate and Interest Model

The borrower’s interest rate is determined by the platform's utilization rate, calculated as follows:

- **Base interest rate**: 2%
- **Utilization brackets**:
  - < 20%: Interest = Base interest + Utilization × 0.2
  - 20-40%: Interest = Base interest + Utilization × 0.4
  - 40-60%: Interest = Base interest + Utilization × 0.6
  - 60-80%: Interest = Base interest + Utilization × 0.8
  - > 80%: Interest = Base interest + Utilization

## Technologies Used

- **Next.js**: Frontend framework for building fast and efficient user interfaces.
- **Tailwind CSS**: For a sleek, responsive, and customizable design.
- **Web3.js**: To interact with the Ethereum blockchain.
- **Solidity**: For writing the smart contracts that power the lending and borrowing logic.
- **MetaMask**: For secure wallet integration, allowing users to connect, lend, and borrow assets directly from their wallets.

## How to Use

1. **Install MetaMask**: Make sure you have MetaMask installed and connected to the Ethereum network.
2. **Lend**: Deposit any of the supported tokens into the platform to earn a fixed 5% annual yield.
3. **Borrow**: Borrow tokens by providing other assets as collateral. Interest is calculated based on the platform's utilization rate.

## Smart Contract

- **Contract Address**: [0xYourContractAddressHere](https://etherscan.io/address/0xYourContractAddressHere)
- **GitHub Repository**: [Smart Contract Code](https://github.com/luffy487/DeFi)

## Future Improvements

- Dynamic risk assessment for collateral
- Additional token support
- Multi-chain support for other blockchains

## License

This project is open-sourced under the MIT license.
