import './App.css'
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { privateRoutes } from './router/routes/private/private.routes';
// import { publicRoutes } from './router/routes/public/public.routes';

function App() {
  const router = createBrowserRouter(privateRoutes as RouteObject[])
  return (
    <RouterProvider router={router} />
  )
}

export default App
