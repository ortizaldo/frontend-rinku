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
    employeeNumber: Yup.string().required("Numero de empleado es requerido"),
    firstName: Yup.string().required("Nombre es requerido"),
    lastName: Yup.string().required("Apellidos es requerido"),
    employeeRol: Yup.string().required("Rol es requerido"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const toast = useRef(null);
  const [err, setErr] = useState("");

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
          {!modal.newMovement && (
            <FormNewEmployee
              register={register}
              errors={errors}
              setValue={setValue}
              setEmployee={setEmployee}
              employee={employee}
            />
          )}
          {modal.newMovement && (
            <FormNewMovementEmployee
              getDataForm={getDataFormEmpMovement}
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
