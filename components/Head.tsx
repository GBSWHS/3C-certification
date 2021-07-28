import NextHead from 'next/head'

const Head = ({ subtitle }: { subtitle: string }) =>
  <NextHead>
    <title>{subtitle} - 3C인증제</title>
    <link rel="shortcut icon" href="/logo.png" type="image/png" />
  </NextHead>

export default Head
