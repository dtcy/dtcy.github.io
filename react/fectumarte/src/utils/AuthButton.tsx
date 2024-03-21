import { useLogin } from "./Auth.provider";

const AuthButton = () => {
  const { handleSignIn, handleSignOut, userData } = useLogin();

  return (
    <div>
      {userData ? (
        <button onClick={handleSignOut}>로그아웃 </button>
      ) : (
        <button onClick={handleSignIn}>구글 로그인</button>
      )}
    </div>
  );
};

export default AuthButton;
