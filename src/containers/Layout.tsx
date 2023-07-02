import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <header className="w-screen max-w-full flex items-center justify-center">
        <Typography variant="h5" className='text-gray-600'>
          Gestion Nutrición
        </Typography>
      </header>
      <main className="w-screen max-w-full h-screen overflow-hidden">
        <Outlet />
      </main>
      <footer>©️ me 2023</footer>
    </>
  );
}