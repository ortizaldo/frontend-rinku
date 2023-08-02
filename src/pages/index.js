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
  const handleClose = (value) => {
    setShowModal(value);
    openModal(value);
  };
  const handleSave = (value) => {
    setShowModal(showModal);
    openModal(value);
    setEmployees([]);
    getData();
  };

  const showToast = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
    });
  };

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

  const accept = () => {
    deleteData(employee);
  };

  const confirmDelete = (event) => {
    setEmployee(event);
    confirmDialog({
      message: "Quieres eliminar esté registro?",
      header: "Eliminar empleados",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Si",
      rejectLabel: "No",
      accept,
    });
  };

  const actionBodyTemplate = (rowData) => {
    console.log(
      "🚀 ~ file: index.js:162 ~ actionBodyTemplate ~ rowData:",
      rowData
    );
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
            {/* <Column
              field="_id"
              header=""
              dataType="string"
              bodyClassName="text-center"
              body={actionsTemplate}
            /> */}
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

export const getStaticProps = async () => {
  const response = await axios.get(`${process.env.API_URL}employees`);
  return {
    props: {
      data: response.data,
    },
  };
};
