import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { Provider as UrqlProvider } from "urql";
import { client } from "./services";

export default function App() {
  return (
    <UrqlProvider value={client}>
      <CssBaseline />
      <RouterProvider router={router} />
    </UrqlProvider>
  );
}
