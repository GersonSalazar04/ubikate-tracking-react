import { createTheme } from "@mui/material";

export const themeOptions = createTheme({
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#066c9e',
    },
    secondary: {
      main: '#3efaf4',
    },
    background: {
      default: '#063b56',
      paper: '#066c9e',
    },
    text: {
      primary: '#ffffff',
    },
    secondaryTextColor: {
      main: '#044b6e'
    },
    customGreen: {
      main: '#1ee9b6'
    },
    customRed: {
      main: '#f0246e'
    },
    customGray: {
      main: '#e1e1e1'
    },
    loginLabelColor: {
      main: '#84a2af'
    },
    scrollBarColor: {
      main: "#6f8997"
    }
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#032b3f",
          color: "#ffffff",
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#044b6e"
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          background: '#066C9E'
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: '#066c9e',
          borderRadius: '20px',
          padding: '0.5em'
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiDataGrid-root .MuiDataGrid-columnHeader, .MuiDataGrid-root .MuiDataGrid-columnHeaderTitleContainer": {
          "&.MuiDataGrid-columnHeader, &.MuiDataGrid-columnHeaderTitleContainer": {
            backgroundColor: "#044b6e",
          },
        },
        ".MuiDataGrid-root .MuiDataGrid-row": {
          backgroundColor: "#066c9e",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff"
        }
      }
    },
    MuiSwitch: {
      styleOverrides: {
        track: {
          backgroundColor: "#ffff", // Reemplaza con el color deseado
        },
      },
    },
    
  }
});