import 'aos/dist/aos.css';

import AOS from 'aos';
import ContextProvider from 'contexts/ContextProvider';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/dist/client/router';
import Error from 'next/error';
import { useEffect } from 'react';
import { analytics } from 'utils/firebase';

function MyApp({ Component, pageProps }: AppProps) {
  const routers = useRouter();

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const logEvent = (url) => {
      analytics().setCurrentScreen(url);
      analytics().logEvent('screen_view');
    };

    routers.events.on('routeChangeComplete', logEvent);
    //For First Page
    logEvent(window.location.pathname);

    //Remvove Event Listener after un-mount
    return () => {
      routers.events.off('routeChangeComplete', logEvent);
    };
  }, []);

  useEffect(() => {
    AOS.init({
      easing: 'ease',
      once: true,
    });
  }, []);

  if (pageProps.error) {
    return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
  }

  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}
export default MyApp;
