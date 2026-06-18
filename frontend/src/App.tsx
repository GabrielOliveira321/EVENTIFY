import { ThemeProvider } from "./Components/ThemeContext";
import { RoutesApp } from "./routes/routes";

function App() {
  return (
    <ThemeProvider>
      <RoutesApp />
    </ThemeProvider>
  );
}

export default App;
