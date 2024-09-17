import { Mulish } from "next/font/google";
import "./globals.css";
import TopBar from "./components/Layout/TopBar";
import { WalletProvider } from "./components/UI/WalletContextProvider";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${mulish.className}`}>
        <Providers>
          <WalletProvider>
            <header>
              <TopBar />
            </header>
            <main>
              <ToastContainer></ToastContainer>
              {children}
            </main>
          </WalletProvider>
        </Providers>
      </body>
    </html>
  );
}
