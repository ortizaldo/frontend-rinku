import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "primeicons/primeicons.css";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
function RinkuApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default RinkuApp;
