import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserContext.jsx";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const theme = extendTheme({
  colors: {
    main: {
      100: "#00b4d8",
      // ...
      200: "#0096c7",
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
