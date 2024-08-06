import Index from "./pages/Index/Index";
import PrivateRoutes from "./PrivateRoutes";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

let routes = [
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <Index />
      </PrivateRoutes>
    ),
  },

  {path : '/login' , element : <Login />} ,
  {path : '/register' , element : <Register />}
];


export default routes