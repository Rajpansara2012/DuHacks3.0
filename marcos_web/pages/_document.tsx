import { Html, Head, Main, NextScript } from "next/document";
import { Toaster } from "react-hot-toast";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <title>MARCOS</title> */}
        <link rel="icon" href="/hacker.png" />
      </Head>
      <body>
        <Toaster />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
