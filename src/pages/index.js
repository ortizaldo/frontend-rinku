import { Container, Row } from "react-bootstrap";
import { SplitButton } from "primereact/splitbutton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal/ModalForm";
import axios from "axios";
import SidebarComponent from "@/components/Sidebar";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import React from "react";
import { Button } from "primereact/button";

/**
 * A description of the entire function.
 *
 * @param {Object} modal - The modal object.
 * @param {Function} openModal - The function to open the modal.
 * @param {Array} data - The data array.
 * @return {ReactNode} The rendered React Fragment.
 */
export default function Home({ modal, openModal, data }) {
  const toast = useRef(null);
  const [visibleRight, setVisibleRight] = useState(false);
  const [showModal, setShowModal] = useState(modal);
  const [employees, setEmployees] = useState(data);
  const [employee, setEmployee] = useState({
    _id: "",
    employeeNumber: "",
    firstName: "",
    lastName: "",
    employeeRol: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  /**
   * Updates the state of the modal and triggers the openModal function.
   *
   * @param {any} value - The new value for the showModal state.
   * @return {undefined} This function does not return a value.
   */
  const handleClose = (value) => {
    setShowModal(value);
    openModal(value);
  };

  /**
   * Handles the save operation.
   *
   * @param {type} value - The value to be saved.
   * @return {type} - The result of the save operation.
   */
  const handleSave = (value) => {
    setShowModal(showModal);
    openModal(value);
    setEmployees([]);
    getData();
  };

  /**
   * Shows a toast message with the given severity, summary, and detail.
   *
   * @param {string} severity - The severity of the toast message.
   * @param {string} summary - The summary of the toast message.
   * @param {string} detail - The detail of the toast message.
   */
  const showToast = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
    });
  };

  /**
   * Fetches data from the API and sets the employees state.
   *
   * @return {Promise<void>} A promise that resolves once the data has been fetched and the employees state has been updated.
   */
  const getData = async () => {
    try {
      const response = await axios.get(`api/handlerEmployees`, {
        params: {
          type: "employees",
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      setEmployees(response.data);
    } catch (error) {
      setErr(error.message);
    }
  };

  /**
   * Deletes data from the API.
   *
   * @param {Object} emp - The employee object to delete.
   * @return {Promise} A promise that resolves once the data is deleted.
   */
  const editData = (data) => {
    modal = {
      show: true,
      title: "Editar empleado",
      newMovement: false,
      newEmployee: false,
      data: data,
      editEmployee: true,
    };

    setEmployee(data);

    openModal(modal);
  };

  const deleteData = async (emp) => {
    try {
      await axios.delete(`api/handlerEmployees`, {
        params: {
          type: "employees",
          _id: emp._id,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      showToast("success", "Empleados", "Se elimino el registro con exitó");
      setEmployee({});
      getData();
    } catch (error) {
      setErr(error.message);
    }
  };

  /**
   * Sets the selected employee and displays a confirmation dialog for deleting a record.
   *
   * @param {Event} event - The event that triggered the function.
   * @return {void} This function does not return a value.
   */
  const confirmDelete = (event) => {
    setEmployee(event);
    confirmDialog({
      message: "Quieres eliminar esté registro?",
      header: "Eliminar empleados",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Si",
      rejectLabel: "No",
      accept: () => {
        deleteData(event);
      },
    });
  };

  /**
   * Generate the function comment for the given function body.
   *
   * @param {object} rowData - the data for the row
   * @return {ReactNode} the rendered React Fragment
   */
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => {
            editData(rowData);
          }}
        />
        <Button
          style={{ marginLeft: "3px" }}
          icon="pi pi-search"
          rounded
          outlined
          severity="info"
          onClick={() => {
            setVisibleRight(true);
            setEmployee(rowData);
          }}
        />
        <Button
          style={{ marginLeft: "3px" }}
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDelete(rowData)}
        />
      </React.Fragment>
    );
  };

  useEffect(() => {}, [showModal, employees]);

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Container fluid className="p-4">
        <div className="card">
          <SidebarComponent
            visibleRight={visibleRight}
            setVisible={() => setVisibleRight(false)}
            employee={employee}
          />
          <DataTable
            value={employees}
            size="small"
            tableStyle={{ minWidth: "50rem" }}
            stripedRows
          >
            <Column
              field="employeeNumber"
              header="Num. Empleado"
              style={{ width: "25%" }}
            ></Column>
            <Column field="firstName" header="Nombre"></Column>
            <Column field="lastName" header="Apellidos"></Column>
            <Column
              field="employeeRol"
              header="Rol"
              style={{ width: "25%", textTransform: "capitalize" }}
            ></Column>
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "12rem" }}
            ></Column>
          </DataTable>
        </div>
      </Container>
      {modal && (
        <Modal
          hdlClose={handleClose}
          hdlSave={handleSave}
          modal={modal}
          employees={employees}
          employee={employee}
          setEmployee={setEmployee}
        ></Modal>
      )}
    </>
  );
}

/**
 * Retrieves static props from an API endpoint.
 *
 * @return {object} The static props containing the data.
 */
export const getStaticProps = async () => {
  const response = await axios.get(`${process.env.API_URL}employees`);
  return {
    props: {
      data: response.data,
    },
  };
};
