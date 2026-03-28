import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./context/AuthContext.jsx";
import { ConfigProvider } from "antd";
import antdTheme from "./config/antdTheme/antdTheme.js";
import OrderContextProvider from "./context/OrderContext.jsx";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnwindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: 0,
      staleTime: 5 * 1000,
    },
  },
});
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
       wave={{ disabled: true }}
        theme={{
          components: {
            Spin: {
              dotSizeLG: 50,
            },
            Select: {
              activeOutlineColor: "transparent",
              borderRadius: 9999,
              colorBgElevated: "#fff",
              colorBgContainer: "#55795f", 
              controlHeight: 40,
              colorTextQuaternary:'#fff'
             

             
            },
          },
          token: {
            colorPrimary: "#3f5a48",
          },
        }}
      >
        <AuthContextProvider>
          <OrderContextProvider>
            <App />
          </OrderContextProvider>
        </AuthContextProvider>
      </ConfigProvider>
    </QueryClientProvider>
  </BrowserRouter>,
  // </StrictMode>
);
