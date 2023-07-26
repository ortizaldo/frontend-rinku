import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ModalComponent({ modal, hdlClose, hdlShow }) {
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
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row p-2">
              <div className="col-6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-hashtag"></i>
                  </span>
                  <Form.Control placeholder="Num. de empleado" />
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <Form.Control placeholder="Nombre" />
                </div>
              </div>
              <div className="col-6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <Form.Control placeholder="Apellidos" />
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-8">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-id-card"></i>
                  </span>
                  <Form.Select aria-label="Default select example">
                    <option value="0">Seleccionar rol</option>
                    <option value="chofer">Chofer</option>
                    <option value="cargador">Cargador</option>
                    <option value="auxiliar">Auxiliar</option>
                  </Form.Select>
                </div>
              </div>
            </div>
          </Form>
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
