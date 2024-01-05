import Document, { Html, Head, Main, NextScript } from 'next/document';
import { JSX } from 'react';

export default class MyDocument extends Document{
  render(): JSX.Element {
    return(
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </Head>
        <body>
          <Main />          
          <NextScript />
        </body>
      </Html>
    );
  };
};