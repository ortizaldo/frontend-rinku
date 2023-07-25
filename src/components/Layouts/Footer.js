import React, { useEffect } from "react";
import Link from "next/link";
import { Inter, Rubik, Poppins } from "@next/font/google";
import clsx from "clsx";

export const titleFont = Rubik({
  subsets: ["latin"],
});

export const text = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Footer() {
  return (
    <header className="md:flex items-center justify-between py-3 md:py-4 bg-gray-900  relative   text-gray-50 "></header>
  );
}
