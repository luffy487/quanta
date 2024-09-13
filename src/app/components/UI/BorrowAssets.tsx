"use client";
import { TokenInfo } from "@/utils/interfaces";
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
interface Props {
  tokensInfo: TokenInfo[];
  handleBorrowClick: (token: string) => void;
}
const BorrowAssets: React.FC<Props> = ({ tokensInfo, handleBorrowClick }) => {
  return (
    <Table aria-label="Token Table">
      <TableHeader>
        <TableColumn className="text-sm text-gray-500">Asset</TableColumn>
        <TableColumn className="text-sm text-gray-500">Available</TableColumn>
        <TableColumn className="text-sm text-gray-500">APR</TableColumn>
        <TableColumn className="text-sm text-gray-500">Collateral</TableColumn>
        <TableColumn>&nbsp;</TableColumn>
      </TableHeader>
      <TableBody>
        {tokensInfo.map((token: any) => (
          <TableRow
            key={token.symbol}
            className="border-y-[0.5px] border-gray-800 text-center"
          >
            <TableCell>{token.symbol}</TableCell>
            <TableCell>{parseFloat(token.available).toFixed(2)}</TableCell>
            <TableCell>{Number(token.apr) + "%"}</TableCell>
            <TableCell>
              <Tooltip
                showArrow={true}
                content={
                  <div className="py-1 px-2">
                    <div className="text-sm text-gray-400 md-2">
                      Available Collaterals
                    </div>
                    <div className="my-2 space-y-1">
                      {tokensInfo
                        .filter((tkn: any) => tkn.token != token.token)
                        .map((tkn: any, index: number) => (
                          <div
                            className="text-xs text-gray-500 font-semibold"
                            key={index}
                          >
                            {index + 1}. 150% {tkn.symbol}
                          </div>
                        ))}
                    </div>
                  </div>
                }
                className="bg-black rounded-lg p-2 text-xs"
              >
                150%
              </Tooltip>
            </TableCell>
            <TableCell>
              <Button
                className="text-customGreen px-3 py-1 rounded-full border border-customGreen"
                onClick={() => handleBorrowClick(token.token)}
              >
                Borrow
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default BorrowAssets;
