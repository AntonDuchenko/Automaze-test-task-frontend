import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { TodoProvider } from "@/context/TodoContext";
import StoreProvider from "./StoreProvider";
import 'react-toastify/dist/ReactToastify.css';

const inter = Roboto({ weight: ["400", "500", "700"], preload: false});

export const metadata: Metadata = {
  title: "Todo app",
  description: "Generated your task to future!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TodoProvider>
      <StoreProvider>
        <html lang="en">
          <body className={inter.className}>
            <Header />

            {children}
          </body>
        </html>
      </StoreProvider>
    </TodoProvider>
  );
}
