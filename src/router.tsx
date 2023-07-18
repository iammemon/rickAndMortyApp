import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import Index, {
  loader as indexLoader,
  action as indexAction,
} from "./routes/index";
import NewScene from "./routes/newScene";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: indexLoader,
        action: indexAction,
      },
      {
        path: "new",
        element: <NewScene />,
      },
    ],
  },
]);

export { router };
