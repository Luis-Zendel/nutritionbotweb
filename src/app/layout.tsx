import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { FixedPlugin, Layout } from "@/components";
import { Provider } from "./provider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NutriWeb",
  description:
    "Genera planes alimenticios a tu medida utilizando IA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://nutritionbotweb.onrender.com"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="shortcut icon" href="/image/food.png" type="image/png" />
      </head>
      <body className={roboto.className}>
        <Provider>
        <Layout>
          {children}
          <FixedPlugin />
        </Layout>
        </Provider>
      </body>
    </html>
  );
}
