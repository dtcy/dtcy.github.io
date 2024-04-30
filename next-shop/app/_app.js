// _app.js 파일

import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout"; // 사용자 정의 레이아웃 컴포넌트

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // 페이지 전환 시 스크롤 위치 맨 위로 이동
  useEffect(() => {
    const handleRouteChange = (url) => {
      window.scrollTo(0, 0);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
