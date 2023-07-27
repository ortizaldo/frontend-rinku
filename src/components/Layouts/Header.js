import React, { useEffect, useState } from "react";
import { Inter, Rubik, Poppins } from "@next/font/google";
import { Menubar } from "primereact/menubar";

export const titleFont = Rubik({
  subsets: ["latin"],
});

export const text = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Header({ openModal }) {
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
              command: () => openModal({ show: true, newEmployee: true }),
            },
            {
              label: "Captura de movimientos",
              icon: "pi pi-fw pi-briefcase",
              // onClick: showModal(),
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
