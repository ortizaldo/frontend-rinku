import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormNewEmployee from "../FormNewEmployee";

export default function ModalComponent({ modal, hdlClose, hdlShow }) {
  console.log("🚀 ~ file: Modal.js:7 ~ ModalComponent ~ modal:", modal);
  const handleClose = () => {
    hdlClose({ show: false });
  };

  return (
    <>
      <Modal
        show={modal && modal.show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modal.newEmployee ? "Nuevo Empleado" : "Editar Empleado"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modal.newEmployee ? <FormNewEmployee /> : "editar empleado"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
