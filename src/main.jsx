import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "antd/dist/reset.css";

import { ConfigProvider, theme } from "antd";
import { GlobalProvider } from "./contexts/Global";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1890ff",
        }
      }}
    >
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </ConfigProvider>
  </React.StrictMode>
);
