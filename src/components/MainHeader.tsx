import React from "react";
import { Box, Typography } from "@mui/material";
import { SignOutButton } from "../auth/SignOutButton";
import { customTheme } from "../theme";
import { useUserItems } from "../api/useUserItems";

export function MainHeader() {
  return (
    <Box
      sx={{ background: customTheme.color.blue[1] }}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={2}
      py={1}
    >
      <Typography
        fontWeight={"bold"}
        px={2}
        py={1}
        color={"white"}
        fontSize={"20px"}
        fontFamily={""}
      >
        Kenin organizator
      </Typography>
      <Box alignItems={"center"} gap={"8px"} display={"flex"}>
        <SignOutButton />
      </Box>
    </Box>
  );
}
