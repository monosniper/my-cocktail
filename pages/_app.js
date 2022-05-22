import '../styles/globals.scss'
import Layout from "../components/Layout";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return <QueryClientProvider client={queryClient}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </QueryClientProvider>
}

export default MyApp
