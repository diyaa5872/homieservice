import { AppBar,IconButton,Toolbar,Typography,Stack, Button } from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon"
import Sidebar from "./Sidebar"

const Navbar = () => {
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#113946' }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="logo">
            <CatchingPokemonIcon />
          </IconButton>
          <Typography variant="h6" component='div' sx={{flexGrow: 1}}>
            HandyHive
          </Typography>
          <Stack direction='row' spacing={2}>
            <Button color="inherit"><Sidebar /></Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
