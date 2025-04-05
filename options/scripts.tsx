import ReactDOM from "react-dom/client";
import Options from "./Options";
import "./styles.css";
import { ToastProvider } from "../components/context/ToastContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <ToastProvider>
    <Options />
  </ToastProvider>
);
