import NextHead from 'next/head'

const Head = ({ subtitle }: { subtitle: string }) =>
  <NextHead>
    <title>{subtitle} - 3C인증제</title>
  </NextHead>

export default Head
