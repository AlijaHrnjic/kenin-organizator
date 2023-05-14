import React from "react";
import { Box } from "@mui/material";
import { useUserItemTypes } from "../api/useItemTypes";
import { SearchItemsDropdown } from "./SearchItemsDropdown";

interface Props {
  onSelectItem: (type: string, name1: string) => void;
}

export function ItemsByTypesSection(props: Props) {
  const types = useUserItemTypes();
  const { onSelectItem } = props;

  return (
    <Box m={3} gap={3} flexWrap={"wrap"} display={"flex"}>
      {types.map((t) => (
        <SearchItemsDropdown
          key={t}
          type={t}
          label={t}
          onSelectItem={onSelectItem}
        />
      ))}
    </Box>
  );
}
