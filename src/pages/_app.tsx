import { ChallengesProvider } from '../contexts/ChallengesContext'

import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      return <Component {...pageProps} />
    </ChallengesProvider>
  )
}

export default MyApp