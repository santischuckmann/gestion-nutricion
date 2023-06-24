import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <header className="w-screen max-w-full flex items-center justify-center">
        <h1 className="inline">My Super Cool App</h1>
      </header>
      <main className="w-screen max-w-full h-screen overflow-hidden">
        <Outlet />
      </main>
      <footer>©️ me 2023</footer>
    </>
  );
}