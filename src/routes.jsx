import Index from "./pages/Index/Index";
import PrivateRoutes from "./PrivateRoutes";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

let routes = [
  {path : '/' , element : <Index />},
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
  },

  {path : '/login' , element : <Login />} ,
  {path : '/register' , element : <Register />}
];


export default routes