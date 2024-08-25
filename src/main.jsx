import { StrictMode } from "react";
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App.jsx";
import "./index.css";
import { Home, About, PinnedCityPage, Map, Contact } from "./pages/pagesIndex.js";
import { NotFound } from "./components/index.js";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="pinned" element={<PinnedCityPage />} />
    <Route path="map" element={<Map />} />
    <Route path="contact" element={<Contact />} />
    <Route path="*" element={<NotFound />} />
  </Route>
));

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
