import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Rick And Morty App
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box width={1} display="flex">
        <Container sx={{ marginTop: 3 }} maxWidth="sm">
          <Outlet />
        </Container>
      </Box>
    </>
  );
}
