import { AppBar,IconButton,Toolbar,Typography,Stack, Button } from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon"
import Sidebarworker from "./Sidebarworker"

const Navbar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="logo">
            <CatchingPokemonIcon />
          </IconButton>
          <Typography variant="h6" component='div' sx={{flexGrow: 1}}>
            Home Service
          </Typography>
          <Stack direction='row' spacing={2}>
            <Button color="inherit"><Sidebarworker /></Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
