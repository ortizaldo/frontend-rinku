import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormNewEmployee from "../Forms/FormNewEmployee";
import { useForm } from "react-hook-form";
import axios from "axios";
import _ from "underscore";
import FormNewMovementEmployee from "../Forms/FormNewMovementEmployee";

export default function ModalComponent({
  modal,
  hdlClose,
  hdlSave,
  employees,
  employee,
  setEmployee,
}) {
  console.log("🚀 ~ file: ModalForm.js:19 ~ employee:", employee);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const toast = useRef(null);
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({
    _id: modal && modal.data ? modal.data._id : "",
    employeeNumber: modal && modal.data ? modal.data.employeeNumber : "",
    firstName: modal && modal.data ? modal.data.firstName : "",
    lastName: modal && modal.data ? modal.data.lastName : "",
    employeeRol: modal && modal.data ? modal.data.employeeRol : "",
  });

  const [formDataMovement, setFormDataMovement] = useState({});

  const showToast = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
    });
  };

  const handleClose = () => {
    resetForm();
    hdlClose({ show: false });
  };

  const onSubmit = (data) => {
    postData(
      modal && !modal.newMovement ? formData : formDataMovement,
      modal && !modal.newMovement ? "employees" : "employee-movements"
    );
  };

  const resetForm = () => {
    setFormData({
      _id: "",
      employeeNumber: "",
      firstName: "",
      lastName: "",
      employeeRol: "",
    });

    setEmployee({
      _id: "",
      employeeNumber: "",
      firstName: "",
      lastName: "",
      employeeRol: "",
    });

    reset();
  };

  const getDataFormEmpMovement = (_formData) => {
    setFormDataMovement(_formData);
    console.log(
      "🚀 ~ file: ModalForm.js:82 ~ getDataFormEmpMovement ~ _formData:",
      _formData
    );
  };

  const getDataForm = (_formData) => {
    setFormData(_formData);
    setEmployee(formData);
  };

  const postData = async (data, type) => {
    try {
      if (modal.editEmployee) {
        await axios.put(`api/handlerEmployees`, data, {
          params: {
            type,
            _id: modal.data._id,
          },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
      } else {
        await axios.post(`api/handlerEmployees`, data, {
          params: {
            type,
          },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
      }

      showToast("success", "Empleados", "Se guardo el registro con exitó");
      modal.show = false;
      reset();
      hdlSave(modal);
    } catch (error) {
      showToast(
        "error",
        "Error al guardar",
        "Ocurrió un problema, intente de nuevo"
      );
      setErr(error.message);
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
          {!modal.newMovement && (
            <FormNewEmployee
              formData={formData}
              employee={employee}
              getDataForm={getDataForm}
              setEmployee={setEmployee}
            />
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
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
