import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import File from "../Home/Components/File/File";
import Text from "../Home/Components/Text/Text";
import Uploads from "../Home/Components/Uploads/Uploads";
import Login from "../Home/Authentication/Login/Login";
import ProtectedRoute from "../Home/Authentication/ProtectedRoute/ProtectedRoute";
import Loading from "../Home/Shared/Loading/Loading";
import FileViewPage from "../FileViewPage/FileViewPage";

const Router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
      children:[
        {
            path: '/',
            element: <ProtectedRoute><File></File></ProtectedRoute>,
        },
        {
            path: '/text',
            element: <ProtectedRoute><Text></Text></ProtectedRoute>,
        },
        {
            path: '/uploads',
            element: <ProtectedRoute><Uploads></Uploads></ProtectedRoute>,
        }
      ]

    },
    {
        path: '/log-in',
        element: <Login></Login>
    },
    {
      path: '/file/:filename',
      element: <FileViewPage></FileViewPage>
  }
  ]);
  

export default Router;