import { createBrowserRouter } from "react-router";
import { Root } from "../Root/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <div className="text-red-600">!Error element shwoing</div>,
    children:[



      
    ]
  },
]);
