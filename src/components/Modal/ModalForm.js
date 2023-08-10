import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormNewEmployee from "../Forms/FormNewEmployee";
import FormNewMovementEmployee from "../Forms/FormNewMovementEmployee";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import _ from "underscore";
import { Alert } from "react-bootstrap";

/**
 * Generate the function comment for the given function body.
 *
 * @param {Object} modal - The modal object.
 * @param {function} hdlClose - The function to handle modal close.
 * @param {function} hdlSave - The function to handle modal save.
 * @param {Array} employees - The array of employees.
 * @param {Object} employee - The employee object.
 * @param {function} setEmployee - The function to set employee object.
 * @return {JSX.Element} - The JSX element of the modal component.
 */
export default function ModalComponent({
  modal,
  hdlClose,
  hdlSave,
  employees,
  employee,
  setEmployee,
}) {
  const validationSchema = Yup.object().shape({
    employeeNumber: Yup.number().required("Employee number is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last name is required"),
    employeeRol: Yup.string().required("Employee role is required"),
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const toast = useRef(null);
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({
    employeeNumber: modal && modal.data ? modal.data.employeeNumber : "",
    firstName: modal && modal.data ? modal.data.firstName : "",
    lastName: modal && modal.data ? modal.data.lastName : "",
    employeeRol: modal && modal.data ? modal.data.employeeRol : "",
  });

  const [formDataMovement, setFormDataMovement] = useState({});

  /**
   * Shows a toast notification with the specified severity, summary, and detail.
   *
   * @param {string} severity - The severity of the toast notification.
   * @param {string} summary - The summary text of the toast notification.
   * @param {string} detail - The detailed text of the toast notification.
   */
  const showToast = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
    });
  };

  /**
   * Closes the handler and resets the form.
   *
   * @return {undefined} No return value.
   */
  const handleClose = () => {
    resetForm();
    hdlClose({ show: false });
  };

  /**
   * Submit the form data to the server.
   *
   * @param {object} formData - The form data to be submitted.
   * @param {string} endpoint - The endpoint to which the data should be sent.
   * @return {void} No return value.
   */
  const onSubmit = (data) => {
    postData(
      data,
      modal && !modal.newMovement ? "employees" : "employee-movements"
    );
  };

  /**
   * Resets the form by setting the form data and employee state to empty values and calling the reset function.
   *
   * @return {void}
   */
  const resetForm = () => {
    setFormData({
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

  /**
   * Set the form data for employee movement and log the data to the console.
   *
   * @param {any} _formData - The form data to set for employee movement.
   * @return {undefined} This function does not return a value.
   */
  const getDataFormEmpMovement = (_formData) => {
    setFormDataMovement(_formData);
    console.log(
      "🚀 ~ file: ModalForm.js:82 ~ getDataFormEmpMovement ~ _formData:",
      _formData
    );
  };

  /**
   * Generates a function comment for the given function body.
   *
   * @param {type} _formData - the data to be set as form data
   * @return {type} description of return value
   */
  const getDataForm = (_formData) => {
    setFormData(_formData);
    setEmployee(formData);
  };

  /**
   * Posts data to the server.
   *
   * @param {Object} data - The data to be posted.
   * @param {string} type - The type of data being posted.
   * @return {Promise<void>} A Promise that resolves when the post request is successful.
   */
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

  const displayErrors = (_errors) => {
    return _errors.map((error, idx) => {
      return (
        <Alert key={idx} variant="danger">
          {error && error.message}
        </Alert>
      );
    });
  };

  useEffect(() => {
    const fields = ["employeeNumber", "firstName", "lastName", "employeeRol"];
    fields.forEach((field) => setValue(field, employee[field]));
  });

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
          {Object.values(errors).length > 0 &&
            displayErrors(Object.values(errors))}
          {!modal.newMovement && (
            <FormNewEmployee register={register} errors={errors} />
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
