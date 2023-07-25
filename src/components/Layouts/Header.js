import React, { useEffect } from "react";
import Link from "next/link";
import { Inter, Rubik, Poppins } from "@next/font/google";
import clsx from "clsx";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";

export const titleFont = Rubik({
  subsets: ["latin"],
});

export const text = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Header() {
  const items = [
    {
      label: "Empleados",
      icon: "pi pi-fw pi-video",
      items: [
        {
          label: "Nuevo",
          icon: "pi pi-fw pi-plus",
          items: [
            {
              label: "Empleado",
              icon: "pi pi-fw pi-user",
            },
            {
              label: "Captura de movimientos",
              icon: "pi pi-fw pi-briefcase",
            },
          ],
        },
        {
          label: "Listado",
          icon: "pi pi-fw pi-list",
          url: "/",
        },
      ],
    },
  ];

  const start = (
    <img alt="logo" src="/rinku.png" height="50" className="mr-2"></img>
  );

  return (
    <header className="md:flex items-center justify-between">
      <Menubar model={items} start={start} />
    </header>
  );
}
