import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { useAuthenticate } from "./auth/useAuthenticate";
import { PrivateComponent } from "./components/PrivateComponent";
import { MainHeader } from "./components/MainHeader";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

function App() {
  useAuthenticate();

  return (
    <ThemeProvider theme={theme}>
      <MainHeader />
      <Router>
        <Routes>
          <Route
            element={
              <PrivateComponent>
                <MainPage />
              </PrivateComponent>
            }
            path={"/"}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
