import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import Layout from "../Components/Layout";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
          <Main as={Layout} />
          <NextScript />
        </body>
      </Html>
    );
  }
}
