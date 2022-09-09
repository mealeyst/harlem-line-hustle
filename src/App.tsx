import { Stage } from "./components/Stage";
import { GlowTheme } from "./theme/Theme";
import { Provider } from 'react-redux'
import store from "./redux";
import { Homepage } from "./pages/Homepage";

function App() {
  return (
    <GlowTheme>
        <Provider store={store}>
          <Stage /> 
          <Homepage />
        </Provider>
    </GlowTheme>
  );
}

export default App;
