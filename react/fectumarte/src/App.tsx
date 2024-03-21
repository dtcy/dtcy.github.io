import Nav from "./pages/nav/Nav";
import Main from "./pages/Main";

import AuthButton from "./utils/AuthButton";
import ContextProvider from "./utils/Auth.provider";

export default function App() {
  return (
    <ContextProvider>
      <Nav></Nav>
      {/* <AuthButton /> */}
      <Main></Main>
    </ContextProvider>
  );
}
