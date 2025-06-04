import React from "react";

function Header() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-5 bg-neutral-100">
        <h1 className="text-4xl font-bold text-center md:text-5xl">Welcome</h1>
        <p className="w-3/4 text-center text-md md:text-xl md:w-1/2">
          Welcome{" "}
          <span className="font-bold underline decoration-violet-500">
            {localStorage.getItem("user")}
          </span>{" "}
          to Tuwaiq Homework Management System. This platform is designed to
          help you manage your homework and assignments efficiently. You can
          view, add, and track your homework tasks easily. Enjoy using the
          system!
        </p>
      </div>
    </>
  );
}

export default Header;
