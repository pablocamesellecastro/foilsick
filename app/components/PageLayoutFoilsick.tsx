"use client";

import SidebarFoilsick from "./SidebarFoilsick";
import SignInButton from "./signinbutton/SignInButton";
import Header from "./Header";

interface PageLayoutFoilsickProps {
  children: React.ReactNode;
  products: any[];
}

export default function PageLayoutFoilsick({ children, products }) {
  return (
    <div className="relative min-h-[100dvh] text-black flex flex-col lg:flex-row">
      <SidebarFoilsick products={products} />
      <div className="flex flex-1 flex-col">
        <Header />
        <main
          id="main-content"
          className="flex flex-1 justify-end p-0 overflow-y-auto min-h-[60dvh]"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
