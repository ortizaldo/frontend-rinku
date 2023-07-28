import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormNewEmployee from "../Forms/FormNewEmployee";
import ReactDOM from "react-dom";
import axios from "axios";
import _ from "underscore";
import FormNewMovementEmployee from "../Forms/FormNewMovementEmployee";

export default function ModalComponent({
  modal,
  hdlClose,
  hdlSave,
  employees,
}) {
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
    postData(modal && modal.newEmployee ? "employees" : "employee-movements");
  };

  const getDataForm = (_formData) => {
    setFormData(_formData);
  };

  const getDataFormEmpMovement = (_formData) => {
    setFormDataMovement(_formData);
  };

  const postData = async (type) => {
    const data = modal && modal.newEmployee ? formData : formDataMovement;
    setIsLoading(true);
    try {
      await axios.post(`api/handlerEmployees?type=${type}`, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      showToast("success", "Empleados", "Se guardo el registro con exitó");
      modal.show = false;
      hdlSave(modal);
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
              getDataForm={getDataFormEmpMovement}
              formData={formDataMovement}
              employees={employees}
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
