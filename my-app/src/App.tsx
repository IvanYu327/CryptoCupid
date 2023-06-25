import "@fontsource-variable/alegreya";
import "@fontsource/atkinson-hyperlegible";
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { ChakraProvider } from "@chakra-ui/react";

import { WalletContextProvider } from "./contexts/WalletContext";
import { XmtpContextProvider } from "./contexts/XmtpContext";
import { Buffer } from "buffer";
import "./styles/styles.css";
import theme from "./theme";

window.Buffer = Buffer;

function App() {
  return (
    <ChakraProvider theme={theme}>
      <WalletContextProvider>
        <XmtpContextProvider>
          <Router>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Landing />} />
            </Routes>
          </Router>
        </XmtpContextProvider>
      </WalletContextProvider>
    </ChakraProvider>
  );
}

export default App;
