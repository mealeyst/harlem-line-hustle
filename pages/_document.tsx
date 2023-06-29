import { Html, Head, Main, NextScript } from 'next/document'
import StyledComponentsRegistry from '../lib/registry'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <body>
        <StyledComponentsRegistry>
          <Main />
        </StyledComponentsRegistry>
        <NextScript />
      </body>
    </Html>
  )
}
