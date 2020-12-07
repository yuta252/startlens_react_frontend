import { createMuiTheme } from "@material-ui/core/styles";
import './Style.module.css';
import orange from '@material-ui/core/colors/orange';
import indigo from '@material-ui/core/colors/indigo';


export const theme = createMuiTheme({
    palette: {
        primary: {
            main: orange[500]
        },
        secondary: {
            main: indigo[500]
        }
    },
    typography: {
        fontFamily: '"Noto Sans JP", Roboto, sans-serif',
    },
});