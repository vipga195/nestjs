import '../styles/globals.css'
import "../assets/styles/index.css"
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '../components/loading';

function MyApp({ Component, pageProps }: AppProps) {
  const router=useRouter();
  const [loading, setLoading]=useState(false);

  const endLoading=() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }

  const { html: HTMLLoading, start, finish }=Loading({ callback: endLoading })

  useEffect(() => {
    start()
    router.events.on("routeChangeError", (e) => {
      setLoading(false)
    });
    router.events.on("routeChangeStart", (e) => {
      start()
      setLoading(false)
    });
    router.events.on("routeChangeComplete", (e) => {

      setLoading(true)
    });

    return () => {
      router.events.off("routeChangeError", (e) => setLoading(false));
      router.events.off("routeChangeStart", (e) => setLoading(false));
      router.events.off("routeChangeComplete", (e) => setLoading(true));
    };
  }, [router.events, start]);

  useEffect(() => {
    setLoading(true)
    start()
  }, [])

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        finish()
      }, 500);
    }
  }, [loading])



  return (
    <div>
      {loading? <HTMLLoading />:''}
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
