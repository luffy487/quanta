"use client";
import { TokenInfo } from "@/utils/interfaces";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
} from "@nextui-org/react";

interface props {
  tokensInfo: TokenInfo[];
  handleSupplyClick: (token: string) => void;
}
const SupplyAssets: React.FC<props> = ({ tokensInfo, handleSupplyClick }) => {
  return (
    <Table aria-label="Token Table">
      <TableHeader>
        <TableColumn className="text-sm text-gray-500">Asset</TableColumn>
        <TableColumn className="text-sm text-gray-500">Total Supply</TableColumn>
        <TableColumn className="text-sm text-gray-500">Utilized</TableColumn>
        <TableColumn>&nbsp;</TableColumn>
      </TableHeader>
      <TableBody>
        {tokensInfo.map((token: any) => (
          <TableRow
            key={token.symbol}
            className="border-y-[0.5px] border-gray-800 text-center"
          >
            <TableCell>
              <Tooltip
                showArrow={true}
                content={token.name}
                className="bg-black rounded-lg p-2 text-xs"
              >
                {token.symbol}
              </Tooltip>
            </TableCell>
            <TableCell>{parseFloat(token.total).toFixed(2)}</TableCell>
            <TableCell>
              <Tooltip
                showArrow={true}
                content={
                  "Utilzed Percentage: " +
                  (token.utilized / token.total) * 100 +
                  "%"
                }
                className="p-2 bg-black text-gray-500 rounded-lg text-sm"
              >
                {parseFloat(token.utilized).toFixed(2)}
              </Tooltip>
            </TableCell>
            <TableCell>
              <Button
                className="text-customGreen px-3 py-1 rounded-full border border-customGreen"
                onClick={() => handleSupplyClick(token.token)}
              >
                Supply
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default SupplyAssets;
