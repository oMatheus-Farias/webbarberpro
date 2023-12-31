import Document, { Html, Head, Main, NextScript } from 'next/document';
import { JSX } from 'react';

export default class MyDocument extends Document{
  render(): JSX.Element {
    return(
      <Html>
        <Head>

        </Head>
        <body>
          <Main />          
          <NextScript />
        </body>
      </Html>
    );
  };
};