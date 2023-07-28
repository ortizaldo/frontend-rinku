import { Container, Row } from "react-bootstrap";
import { SplitButton } from "primereact/splitbutton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
import axios from "axios";
export default function Home({ modal, openModal, data }) {
  const [showModal, setShowModal] = useState(modal);
  const [employees, setEmployees] = useState(data);
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

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`api/handlerEmployees`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      setEmployees(response.data);
    } catch (error) {
      setErr(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const items = [
    {
      label: "Ver movimientos",
      icon: "pi pi-search",
      command: () => {
        // toast.current.show({
        //   severity: "warn",
        //   summary: "Delete",
        //   detail: "Data Deleted",
        // });
      },
    },
    {
      label: "Eliminar empleado",
      icon: "pi pi-times",
      command: () => {
        // toast.current.show({
        //   severity: "warn",
        //   summary: "Delete",
        //   detail: "Data Deleted",
        // });
      },
    },
  ];

  const actionsTemplate = (option) => {
    return (
      <div className="flex">
        <SplitButton
          text
          size="small"
          label="Editar"
          icon="pi pi-user-edit"
          model={items}
        />
      </div>
    );
  };

  useEffect(() => {}, [showModal, employees]);

  return (
    <>
      <Container fluid className="p-4">
        <div className="card">
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
              field="_id"
              header=""
              dataType="string"
              bodyClassName="text-center"
              body={actionsTemplate}
            />
          </DataTable>
        </div>
      </Container>
      {modal && (
        <Modal
          hdlClose={handleClose}
          hdlSave={handleSave}
          modal={modal}
          employees={employees}
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
