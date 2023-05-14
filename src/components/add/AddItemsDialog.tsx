import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { AddedTypes } from "./AddedTypes";
import { AddTypeDropdown } from "./AddTypeDropdown";
import { addItemsAndTypes, useUserItems } from "../../api/useUserItems";
import _ from "lodash";
import { useCurrentUser } from "../../auth/useCurrentUser";

interface Props {
  onClose: () => void;
}

export interface AddedItem {
  link: string;
  available: boolean;
  name: string;
}

export interface AddedType {
  type: string;
  addedItems: AddedItem[];
}

export function AddItemsDialog(props: Props) {
  const [addedTypes, setAddedTypes] = useState<AddedType[]>([]);
  const { onClose } = props;
  const allItems = useUserItems();
  const userId = useCurrentUser()?.uid;

  return (
    <Dialog fullWidth onClose={onClose} open>
      <DialogTitle>Dodaj komponente</DialogTitle>
      <DialogContent>
        <Box>
          <AddedTypes addedTypes={addedTypes} setAddedTypes={setAddedTypes} />
          <AddTypeDropdown
            onAddType={(addedType) =>
              setAddedTypes((alreadyAddedTypes) => [
                ...alreadyAddedTypes,
                { type: addedType, addedItems: [] },
              ])
            }
            addedTypes={addedTypes.map((t) => t.type)}
          />
          <Box display={"flex"} justifyContent={"right"} mt={2}>
            <Button onClick={handleSave} variant={"contained"}>
              Sačuvaj
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );

  function handleSave() {
    if (!validate()) {
      return;
    }

    addItemsAndTypes(addedTypes, userId!);
    onClose();
  }

  function validate() {
    let valid = true;
    for (const type of addedTypes) {
      for (const item of type.addedItems) {
        if (
          !_.isNil(
            allItems?.find((i) => i.type === type.type && i.name === item.name)
          )
        ) {
          alert(`Komponenta ${type.type} - ${item.name} je već dodana.`);
          valid = false;
          break;
        }
      }

      if (!valid) {
        break;
      }
    }

    return valid;
  }
}
