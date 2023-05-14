import React from "react";
import { Autocomplete, Box, TextField, useTheme } from "@mui/material";
import { useUserItems } from "../api/useUserItems";
import _ from "lodash";

interface Props {
  label: string;
  type?: string;
  onSelectItem: (type: string, name: string) => void;
}

const ITEM_TYPE_SEPARATOR = " - ";

interface Option {
  label: string;
  type: string;
  name: string;
}

export function SearchItemsDropdown(props: Props) {
  const theme = useTheme();
  const { label, type, onSelectItem } = props;

  const items = useUserItems(type) || [];

  return (
    <Box
      borderRadius={5}
      boxShadow={"initial"}
      border={"1px solid" + theme.palette.primary.main}
      p={theme.spacing(3)}
      width={"400px"}
    >
      <Autocomplete
        onChange={handleChange}
        value={null}
        fullWidth
        renderInput={(params) => <TextField {...params} label={label} />}
        options={mapOptions()}
      />
    </Box>
  );

  function mapOptions() {
    return items?.map(
      (item) =>
        ({
          label:
            (_.isNil(type)
              ? item.type.replace(ITEM_TYPE_SEPARATOR, "") + ITEM_TYPE_SEPARATOR
              : "") + item.name,
          type: item.type,
          name: item.name,
        } as Option)
    );
  }

  function handleChange(_ignore: any, newValue: Option | null) {
    if (_.isNil(newValue) || newValue === null) {
      return;
    }

    const selectedType = _.isNil(type) ? newValue.type : type!;

    onSelectItem(selectedType, newValue.name);
  }
}
