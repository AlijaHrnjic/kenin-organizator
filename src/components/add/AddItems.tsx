import React, { useState } from "react";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { IconButton } from "@mui/material";
import { AddItemsDialog } from "./AddItemsDialog";

export function AddItems() {
  const [showAddItemsDialog, setShowAddItemsDialog] = useState(false);

  return (
    <>
      <IconButton
        sx={{ width: 106, marginLeft: 3 }}
        onClick={() => setShowAddItemsDialog(true)}
      >
        <AddSharpIcon fontSize={"large"} color={"primary"} />
      </IconButton>
      {showAddItemsDialog && (
        <AddItemsDialog onClose={() => setShowAddItemsDialog(false)} />
      )}
    </>
  );
}
