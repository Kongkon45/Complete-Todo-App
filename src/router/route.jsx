import { createBrowserRouter } from "react-router-dom";
import Todo from "../Components/Todo";
import EditTodos from "../page/edit-todo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Todo />,
  },
  {
    path: "/edit/:id",
    element: <EditTodos />,
  },
]);

export default router;
