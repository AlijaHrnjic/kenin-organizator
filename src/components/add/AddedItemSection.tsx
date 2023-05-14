import React from "react";
import { AddedItem } from "./AddItemsDialog";
import { Box, IconButton, Switch, TextField } from "@mui/material";
import { customTheme } from "../../theme";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface Props {
  onChange: (addedItem: AddedItem) => void;
  addedItem: AddedItem;
  onDeleteItem: () => void;
}

export function AddedItemSection(props: Props) {
  const { onChange, addedItem, onDeleteItem } = props;

  return (
    <Box mb={1} display={"flex"} alignItems={"center"} gap={1}>
      <TextField
        onChange={(e) => onChange({ ...addedItem, name: e.target.value })}
        label={"Oznaka"}
        value={addedItem.name}
      />
      <TextField
        onChange={(e) => onChange({ ...addedItem, link: e.target.value })}
        label={"Link"}
        value={addedItem.link}
      />
      <Switch
        title={"Dostupno"}
        onChange={(_ignore, value) =>
          onChange({ ...addedItem, available: value })
        }
        defaultChecked
      />
      <IconButton onClick={onDeleteItem}>
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
}
