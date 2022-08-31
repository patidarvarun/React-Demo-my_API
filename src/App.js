import { BrowserRouter } from "react-router-dom";
import CustomRoute from "./router/Routers";

function App() {
  return (
    <BrowserRouter>
      <CustomRoute />
    </BrowserRouter>
  );
}

export default App;
