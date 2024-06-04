import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export const theme =(value:PaletteMode) => createTheme({
  palette: {
    mode: value,
   
  },
});
