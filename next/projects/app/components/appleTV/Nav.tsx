import { useLogin } from "./Auth.provider";

export default function Nav() {
  const { signState, userData, handleSignIn, handleSignOut } = useLogin();
  const NavStyle = {
    color: "white",
    backgroundColor: "black",
  };
  return (
    <div>
      {" "}
      <div className="nav" style={NavStyle}>
        <div
          className="nav-wrapper"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="logo">Apple</div>
          <div className="buttons">
            <button
              className={signState === true ? "sign-in-hide" : "sign-in"}
              onClick={handleSignIn}
            >
              Login
            </button>
            <div className="profileImg">
              {userData ? (
                <img
                  style={{ width: "3rem", borderRadius: "2rem" }}
                  src={userData.photoURL}
                  alt="Profile"
                />
              ) : (
                ""
              )}
            </div>
            <button
              className={signState === false ? "sign-out-hide" : "sign-out"}
              onClick={handleSignOut}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
