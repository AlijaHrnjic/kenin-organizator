import React, { useState } from "react";
import { Button, useTheme } from "@mui/material";
import { signInWithRedirect, signOut } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { logoutWidth, ShowUser } from "./ShowUser";

export function SignOutButton() {
  const [showButton, setShowButton] = useState(false);
  const theme = useTheme();

  if (showButton) {
    return (
      <Button
        sx={{
          width: logoutWidth,
          borderColor: theme.palette.common.white,
          color: theme.palette.common.white,
          "&:hover": {
            borderColor: theme.palette.common.white,
          },
        }}
        variant={"outlined"}
        onMouseLeave={() => setShowButton(false)}
        onClick={() => {
          signOut(auth);
          signInWithRedirect(auth, provider);
        }}
      >
        Odjava
      </Button>
    );
  }

  return <ShowUser onMouseEnter={() => setShowButton(true)} />;
}
