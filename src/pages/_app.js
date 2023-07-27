import Header from "../components/Layouts/Header";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "primeicons/primeicons.css";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import { useEffect, useState } from "react";
function RinkuApp({ Component, pageProps }) {
  const [modal, setModal] = useState("");

  const isOpenModal = (valor) => {
    setModal(valor);
  };

  return (
    <>
      <Header openModal={isOpenModal} />
      <Component openModal={isOpenModal} modal={modal} {...pageProps} />
    </>
  );
}

export default RinkuApp;
