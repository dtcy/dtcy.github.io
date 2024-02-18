import React, { useEffect, useState } from 'react';

const GoogleAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [googleAuth, setGoogleAuth] = useState(null);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  // Google API 스크립트를 동적으로 로드
  const loadGoogleScript = () => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = initGoogleAuth;
    document.body.appendChild(script);
  };

  // Google API 초기화
  const initGoogleAuth = () => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          client_id: '293751780551-of3d2ekp1bce8eetspdaalvqosv0kgqs.apps.googleusercontent.com', // Google Developer Console에서 발급 받은 클라이언트 ID 입력
        })
        .then(auth => {
          setGoogleAuth(auth);
          setIsAuthInitialized(true); // 인증이 초기화되었음을 알림
        });
    });
  };

  // 구글 로그인
  const handleLogin = () => {
    if (googleAuth) {
      googleAuth.signIn().then(() => {
        setIsLoggedIn(true);
      });
    }
  };

  // 구글 로그아웃
  const handleLogout = () => {
    if (googleAuth) {
      googleAuth.signOut().then(() => {
        setIsLoggedIn(false);
      });
    }
  };

  // 컴포넌트가 마운트된 후 Google API 스크립트 로드
  useEffect(() => {
    loadGoogleScript();
  }, []);

  return (
    <div>
      {isAuthInitialized && !isLoggedIn ? (
        <button onClick={handleLogin}>Google 로그인</button>
      ) : isAuthInitialized ? (
        <button onClick={handleLogout}>Google 로그아웃</button>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default GoogleAuth;
