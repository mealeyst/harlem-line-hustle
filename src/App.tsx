import { useState } from "react";
import { Stage } from "./components/Stage";
import { Login } from "./pages/Login";
import { GlowTheme } from "./theme/Theme";
import LoginContext from "./contexts/LoginContext";
import { Provider } from 'react-redux'
import { checkCookieName } from "./util";
import store from "./redux";

function App() {
  const [error, setError] = useState<Error | null>(null);
  const initialValue = !!checkCookieName('loggedin');
  const [loggedIn, setLoggedIn] = useState<boolean>(initialValue);
  const value = { error, setError, loggedIn, setLoggedIn};
  return (
    <GlowTheme>
      <LoginContext.Provider value={value}>
        <Provider store={store}>
          <Stage /> 
          <Login /> 
        </Provider>
      </LoginContext.Provider>
    </GlowTheme>
  );
}

export default App;
