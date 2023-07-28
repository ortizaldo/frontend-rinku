import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormNewEmployee from "../Forms/FormNewEmployee";
import ReactDOM from "react-dom";
import axios from "axios";
import _ from "underscore";
import FormNewMovementEmployee from "../Forms/FormNewMovementEmployee";

export default function ModalComponent({ modal, hdlClose, hdlSave }) {
  const toast = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({});
  const [formDataMovement, setFormDataMovement] = useState({});

  const showToast = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
    });
  };

  const handleClose = () => {
    hdlClose({ show: false });
  };

  const handleSave = () => {
    postData();
  };

  const getDataForm = (_formData) => {
    setFormData(_formData);
  };

  const postData = async () => {
    setIsLoading(true);
    try {
      await axios.post("api/handlerEmployees", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      showToast("success", "Empleados", "Se guardo el empleado con exitó");

      hdlSave({ show: false });
    } catch (error) {
      showToast(
        "error",
        "Error al guardar",
        "Ocurrió un problema, intente de nuevo"
      );
      setErr(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Modal
        show={modal && modal.show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{modal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modal.newEmployee && (
            <FormNewEmployee getDataForm={getDataForm} formData={formData} />
          )}
          {modal.newMovement && (
            <FormNewMovementEmployee
              getDataForm={getDataForm}
              formData={formDataMovement}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
