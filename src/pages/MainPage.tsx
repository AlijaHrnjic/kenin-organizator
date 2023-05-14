import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ShowSelectedItem } from "../components/ShowSelectedItem";
import { Item } from "../models/item";
import { useUserItems } from "../api/useUserItems";
import _ from "lodash";
import { ItemsByTypesSection } from "../components/ItemsByTypesSection";
import { SearchItemsDropdown } from "../components/SearchItemsDropdown";
import { AddItems } from "../components/add/AddItems";

export function MainPage() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const items = useUserItems();
  console.log(items);

  useEffect(() => {
    if (!_.isNil(selectedItem)) {
      const changedItem = items?.find(
        (i) => i.name === selectedItem.name && i.type === selectedItem.type
      );

      setSelectedItem(changedItem ?? null);
    }
  }, [items]);

  return (
    <>
      <Box
        flexDirection={"column"}
        display={"flex"}
        justifyContent={"center"}
        width={"100%"}
      >
        <Box mt={2} display={"flex"} justifyContent={"center"}>
          <SearchItemsDropdown
            onSelectItem={handleSelectItem}
            label={"Pretraži sve"}
          />
          <AddItems />
        </Box>
        <ItemsByTypesSection onSelectItem={handleSelectItem} />
      </Box>
      {selectedItem && (
        <ShowSelectedItem
          onClose={() => setSelectedItem(null)}
          selectedItem={selectedItem}
        />
      )}
    </>
  );

  function handleSelectItem(type: string, name: string) {
    const item = items?.find((i) => i.name === name && i.type === type);

    setSelectedItem(item ?? null);
  }
}
