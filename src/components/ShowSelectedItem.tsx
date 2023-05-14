import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
} from "@mui/material";
import { Item } from "../models/item";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Available } from "./Available";
import _ from "lodash";
import { deleteItem } from "../api/useUserItems";
import { useCurrentUser } from "../auth/useCurrentUser";

interface Props {
  selectedItem: Item;
  onClose: () => void;
}

export function ShowSelectedItem(props: Props) {
  const { selectedItem, onClose } = props;
  const user = useCurrentUser();

  return (
    <Dialog onClose={onClose} open>
      <DialogTitle>{selectedItem.type + " - " + selectedItem.name}</DialogTitle>
      <DialogContent>
        <Box
          justifyContent={"space-between"}
          display={"flex"}
          alignItems={"center"}
          width={"500px"}
        >
          {!_.isNil(selectedItem.link) && (
            <Link
              underline={"hover"}
              href={selectedItem.link}
              target={"_blank"}
            >
              Link
            </Link>
          )}
          <Box gap={2} display={"flex"}>
            <IconButton
              onClick={() =>
                deleteItem(selectedItem.type, selectedItem.name, user?.uid!)
              }
            >
              <DeleteOutlineIcon />{" "}
            </IconButton>
            <Available selectedItem={selectedItem} />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
