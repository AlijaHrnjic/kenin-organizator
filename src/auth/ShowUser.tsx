import React from "react";
import { useCurrentUser } from "./useCurrentUser";
import { Typography } from "@mui/material";

export const logoutWidth = "100px";

interface Props {
  onMouseEnter: () => void;
}

export function ShowUser({ onMouseEnter }: Props) {
  const currentUser = useCurrentUser();
  return (
    <Typography
      justifyContent={"center"}
      display={"flex"}
      width={logoutWidth}
      onMouseEnter={onMouseEnter}
      color={"white"}
    >
      {currentUser?.displayName}
    </Typography>
  );
}
