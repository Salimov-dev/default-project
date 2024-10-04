import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// styles
import "./styles/reset.styles.css";
import "./styles/app.styles.css";

createRoot(document.getElementById("root")!).render(<App />);
