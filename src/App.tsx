import { useState } from "react";
import { Stage } from "./components/Stage";
import { Login } from "./pages/Login";
import { GlowTheme } from "./theme/Theme";
import LoginContext from "./contexts/LoginContext";
import { checkCookieName } from "./util";

function App() {
  const [error, setError] = useState<Error | null>(null);
  const initialValue = !!checkCookieName('loggedin');
  const [loggedIn, setLoggedIn] = useState<boolean>(initialValue);
  const value = { error, setError, loggedIn, setLoggedIn};
  return (
    <GlowTheme>
      <LoginContext.Provider value={value}>
        <Stage /> 
        <Login /> 
        </LoginContext.Provider>
    </GlowTheme>
  );
}

export default App;
