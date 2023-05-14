import React from "react";
import { AddedItem, AddItemsDialog } from "./AddItemsDialog";
import { Box, IconButton, Typography } from "@mui/material";
import { AddedItemSection } from "./AddedItemSection";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { customTheme } from "../../theme";

interface Props {
  handleChange: (addedItems: AddedItem[]) => void;
  addedItems: AddedItem[];
  type: string;
  onDeleteItemType: (deletedItemType: string) => void;
}

export function AddItemsByType(props: Props) {
  const { addedItems, handleChange, type, onDeleteItemType } = props;

  return (
    <Box
      mb={2}
      borderRadius={2}
      sx={{ background: customTheme.color.blue[4] }}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      p={2}
    >
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
        mb={1}
        display={"flex"}
      >
        <Typography variant={"h6"}>{type}</Typography>
        <IconButton onClick={() => onDeleteItemType(type)}>
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
      {addedItems.map((ai, aiIndex) => (
        <AddedItemSection
          key={aiIndex}
          onChange={(addedItem: AddedItem) => {
            handleChange(
              addedItems.map((oai, oaiIndex) => {
                if (oaiIndex === aiIndex) {
                  return addedItem;
                }

                return oai;
              })
            );
          }}
          addedItem={ai}
          onDeleteItem={() => {
            handleChange(
              addedItems.filter((oai, oaiIndex) => oaiIndex !== aiIndex)
            );
          }}
        />
      ))}
      <IconButton
        onClick={() =>
          handleChange([...addedItems, { link: "", name: "", available: true }])
        }
      >
        <AddSharpIcon fontSize={"large"} color={"primary"} />
      </IconButton>
    </Box>
  );
}
