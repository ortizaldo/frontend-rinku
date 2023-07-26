import { Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
export default function Home({ modal, openModal }) {
  console.log("🚀 ~ file: index.js:5 ~ Home ~ modal:", modal);
  const [showModal, setShowModal] = useState(modal);
  const handleClose = (value) => {
    setShowModal(value);
    openModal(value);
  };
  const handleShow = (value) => {
    setShowModal(showModal);
    openModal(value);
  };

  useEffect(() => {}, [showModal]);

  return (
    <>
      <Container fluid className="p-4"></Container>
      {modal && (
        <Modal
          hdlClose={handleClose}
          hdlShow={handleShow}
          modal={modal}
        ></Modal>
      )}
    </>
  );
}
