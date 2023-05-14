import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useUserItemTypes } from "../../api/useItemTypes";
import _ from "lodash";

interface Props {
  addedTypes: string[];
  onAddType: (addedType: string) => void;
}

const CREATE_OPTION = "createOption";
const SELECT_OPTION = "selectOption";

export function AddTypeDropdown(props: Props) {
  const types = useUserItemTypes();

  const { addedTypes, onAddType } = props;

  return (
    <Autocomplete
      clearOnBlur
      renderInput={(params) => (
        <TextField {...params} label={"Dodaj tip (udari enter da dodaš)"} />
      )}
      options={types.filter((t) =>
        _.isNil(addedTypes.find((addedType) => addedType === t))
      )}
      onChange={handleChange}
      fullWidth
      freeSolo
      sx={{ marginTop: 1 }}
    />
  );

  function handleChange(_ignore: any, newValue: string | null, reason: string) {
    if (reason !== CREATE_OPTION && reason !== SELECT_OPTION) {
      return;
    }

    if (!_.isNil(addedTypes.find((addedType) => addedType === newValue))) {
      alert("Taj tip si već dodao.");
      return;
    }

    if (_.isNil(newValue) || _.isEmpty(newValue)) {
      alert("Nisi upisao tip.");
      return;
    }

    onAddType(newValue!);
  }
}
