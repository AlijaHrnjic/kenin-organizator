import { Box } from "@mui/material";
import React from "react";
import { AddItemsByType } from "./AddItemsByType";
import { AddedItem, AddedType } from "./AddItemsDialog";

interface Props {
  addedTypes: AddedType[];
  setAddedTypes: React.Dispatch<React.SetStateAction<AddedType[]>>;
}

export function AddedTypes(props: Props) {
  const { addedTypes, setAddedTypes } = props;

  return (
    (
      <Box>
        {addedTypes.map((t, i) => (
          <AddItemsByType
            handleChange={(changedItems: AddedItem[]) =>
              setAddedTypes(
                addedTypes.map((at, ai) => {
                  if (ai === i) {
                    return { ...at, addedItems: changedItems };
                  }

                  return at;
                })
              )
            }
            addedItems={t.addedItems}
            type={t.type}
            key={i}
            onDeleteItemType={handleDeleteItemType}
          />
        ))}
      </Box>
    ) ?? null
  );

  function handleDeleteItemType(deletedType: string) {
    setAddedTypes((addedTypes) =>
      addedTypes.filter((at) => at.type !== deletedType)
    );
  }
}
