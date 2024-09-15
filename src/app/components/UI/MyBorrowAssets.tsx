"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { WEItoETH, convertedDate } from "@/utils/helper";
import { Borrow, TokenBorrows } from "@/utils/interfaces";

interface props {
  tokenBorrows: TokenBorrows;
  getToken: (token: string) => any;
  repay: (token: string, index: number) => void;
  interest: (info: any) => number;
}
const MyBorrowAssets: React.FC<props> = ({
  tokenBorrows,
  getToken,
  repay,
  interest,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableColumn className="text-sm text-gray-500">Asset</TableColumn>
        <TableColumn className="text-sm text-gray-500">Amount</TableColumn>
        <TableColumn className="text-sm text-gray-500">Collateral</TableColumn>
        <TableColumn className="text-sm text-gray-500">Interest</TableColumn>
        <TableColumn className="text-sm text-gray-500">Borrowed At</TableColumn>
        <TableColumn className="text-sm text-gray-500">Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {Object.keys(tokenBorrows).flatMap((token: string) =>
          tokenBorrows[token].map((borrow: Borrow, index: number) => (
            <TableRow
              key={index}
              className="border-y-[0.5px] border-gray-800 text-center"
            >
              <TableCell>{getToken(token)?.symbol}</TableCell>
              <TableCell>{WEItoETH(borrow.amount).toFixed(2)}</TableCell>
              <TableCell>{getToken(borrow.cToken)?.symbol}</TableCell>
              <TableCell>
                {!borrow.paid ? (
                  <Tooltip
                    content={
                      <div className="bg-black px-3 py-2 rounded-lg flex-row space-y-1">
                        <div className="text-sm text-gray-400">
                          Current Accured Amount
                        </div>
                        <div className="text-xs text-gray-500">
                          {WEItoETH(interest(borrow))}
                        </div>
                      </div>
                    }
                  >
                    {parseFloat(borrow.interest.toString()).toFixed(2) + "%"}
                  </Tooltip>
                ) : (
                  <div>
                    {parseFloat(borrow.interest.toString()).toFixed(2) + "%"}
                  </div>
                )}
              </TableCell>
              <TableCell className="text-xs">
                {convertedDate(borrow.timestamp)}
              </TableCell>
              <TableCell>
                {borrow.paid ? (
                  <Chip
                    color="success"
                    className="px-3 py-1 rounded-full text-customGreen border border-customGreen"
                  >
                    Paid
                  </Chip>
                ) : (
                  <Button
                    className="px-3 py-1 rounded-full text-customGreen border border-customGreen"
                    onClick={() => {
                      repay(token, index);
                    }}
                  >
                    Repay
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
export default MyBorrowAssets;
