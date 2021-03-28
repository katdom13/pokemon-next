// import '../styles/globals.css'
import { useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClientProvider, QueryClient } from "react-query";
import CssBaseline from '@material-ui/core/CssBaseline';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
