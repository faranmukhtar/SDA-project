import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Catalog from "./pages/Catalog";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Retailer from "./pages/Retailer";
import Search from "./pages/Search";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/retailer",
    element: <Retailer />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <Admin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search",
    element: <Search />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/catalog",
    element: <Catalog />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
