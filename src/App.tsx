import { useState } from "react";
import { Stage } from "./components/Stage";
import ErrorContext from "./contexts/ErrorContext";
import { Login } from "./pages/Login";
import { GlowTheme } from "./theme/Theme";

function App() {
  const [error, setError] = useState<Error | null>(null);
  const value = { error, setError };
  return (
    <GlowTheme>
      <ErrorContext.Provider value={value}>
        <Stage /> 
        <Login setError={setError}/> 
      </ErrorContext.Provider>
    </GlowTheme>
  );
}

export default App;
