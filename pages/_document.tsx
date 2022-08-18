import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
        rel="stylesheet"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap"
        rel="stylesheet"
      ></link>
      <link 
        href="https://fonts.googleapis.com/css2?family=Caveat&display=swap" 
        rel="stylesheet"
      ></link>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
