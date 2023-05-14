import React, { useState } from "react";
import { Item } from "../models/item";
import { Button, useTheme } from "@mui/material";
import { useCurrentUser } from "../auth/useCurrentUser";
import { changeAvailableItem } from "../api/useUserItems";

interface Props {
  selectedItem: Item;
}

const buttonWidth = "160px";

export function Available(props: Props) {
  const [showEditButton, setShowEditButton] = useState(false);
  const { selectedItem } = props;
  const theme = useTheme();
  const user = useCurrentUser();

  if (showEditButton) {
    return (
      <Button
        onMouseLeave={() => setShowEditButton(false)}
        variant={"contained"}
        color={"primary"}
        sx={{ width: buttonWidth }}
        onClick={() =>
          changeAvailableItem(selectedItem.type, selectedItem.name, user?.uid!)
        }
      >
        {selectedItem.available ? "Nije dostupno" : "Dostupno"}
      </Button>
    );
  }

  return (
    <Button
      sx={{
        backgroundColor: getAvailableColor(),
        color: theme.palette.common.white,
        width: buttonWidth,
      }}
      onMouseEnter={() => setShowEditButton(true)}
    >
      {selectedItem.available ? "Dostupno" : "Nije dostupno"}
    </Button>
  );

  function getAvailableColor() {
    return selectedItem.available
      ? theme.palette.success.main
      : theme.palette.error.main;
  }
}
