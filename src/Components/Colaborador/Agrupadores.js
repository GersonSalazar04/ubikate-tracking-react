import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};




export default function MultipleSelectChip({ options }) {
  const theme = useTheme();
  const [agrupadores, setAgrupadores] = React.useState([]);
  const [optiones, setOpciones] = React.useState([]);
  console.log("selec")
  function getStyles(name, agrupadores, theme) {
    return {
      fontWeight:
        agrupadores.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
      backgroundColor:  agrupadores.find( grupo => grupo === name ) ? theme.palette.background.default : 'transparent'
    };
  }

  const handleChange = (event) => {
    const { target: { value }, } = event;
    setAgrupadores(value);
  };

  const handleChipDelete = (name) => {
    const updatedPersonName = agrupadores.filter((value) => value !== name);

    setAgrupadores(updatedPersonName);
  };

  return (
    <>
      <Select
        size='small'
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        sx={{ borderRadius: '20px', width: '300px', overflow: "auto" }}
        multiple
        value={agrupadores}
        onChange={handleChange}
        renderValue={(selected) => (
          <Stack direction="row" spacing={1}>
            {selected.map((value) => (
              <Chip
                color='secondary'
                key={value}
                label={value}
                onDelete={() => handleChipDelete(value)}
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
              />
            ))}
          </Stack>
        )}
        MenuProps={MenuProps}
      >
        {options.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, agrupadores, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}