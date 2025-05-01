import React from "react";
import { Routes, Route } from "react-router-dom";
import EducationList from "../pages/EducationList";
import EducationMap from "../pages/EducationMap";
import SpaceList from "../pages/SpaceList";
import SpaceMap from "../pages/SpaceMap";
import Mypage from "../pages/Mypage";
import SignUp from "../pages/SignUp";
import Detail from "../pages/Detail";

const routes = [
  { path: "/", element: <EducationList /> },
  { path: "/education-map", element: <EducationMap /> },
  { path: "/space-list", element: <SpaceList /> },
  { path: "/space-map", element: <SpaceMap /> },
  { path: "/mypage", element: <Mypage /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/detail/:type/:id", element: <Detail /> },
];

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
