import { Stage } from "./components/Stage";
import { Login } from "./pages/Login";
import { GlowTheme } from "./theme/Theme";

function App() {
  console.log('App Rendering')
  return (
    <GlowTheme>
        <Stage /> 
        <Login /> 
    </GlowTheme>
  );
}

export default App;
