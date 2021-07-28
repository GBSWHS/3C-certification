import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import 'nprogress/nprogress.css'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import NProgress from 'nprogress'
import { config, dom } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false

Router.events.on('routeChangeError', () => NProgress.done())
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())

const App = ({ Component, pageProps }: AppProps) =>
  <>
    <style>{dom.css()}</style>
    <Component {...pageProps} />
  </>

export default App
