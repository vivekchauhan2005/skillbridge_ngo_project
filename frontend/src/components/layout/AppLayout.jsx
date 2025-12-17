import React from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar";

const AppLayout = () => {
  return (
    <>
      <AppNavbar />
      <main className="pt-14">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
