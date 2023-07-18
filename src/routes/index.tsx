import localforage from "localforage";
import {
  useLoaderData,
  Link,
  ActionFunctionArgs,
  redirect,
} from "react-router-dom";
import { Box, Fab, Typography, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SceneCard } from "../components";
import { Scene } from "../components/AddScene/type";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  if (payload._action === "delete") {
    const previousScenes = await localforage.getItem<Scene[]>("scenes");
    const scenes = previousScenes?.filter((scene) => scene.id !== payload.id);
    await localforage.setItem("scenes", scenes);
  }

  return redirect("/");
}

export async function loader() {
  const data = (await localforage.getItem<Scene[] | null>("scenes")) || [];

  return data;
}

export default function Index() {
  const { spacing } = useTheme();
  const data = useLoaderData() as Scene[];

  return (
    <Box p={1} width={1} height={1}>
      <Fab
        component={Link}
        to="new"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      <Box
        mt={3}
        height={1}
        display="flex"
        flexDirection="column"
        gap={spacing(1)}
      >
        {data.length ? (
          data.map((scene) => <SceneCard key={scene.id} data={scene} />)
        ) : (
          <Typography align="center" variant="body1">
            Click the + button at the bottom right to get Started
          </Typography>
        )}
      </Box>
    </Box>
  );
}
