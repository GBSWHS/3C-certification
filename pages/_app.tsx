import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

const App = ({ Component, pageProps }: AppProps) =>
  <>
    <Toaster position='top-center' />
    <Component {...pageProps} />
  </>

export default App
