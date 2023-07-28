import { Container, Row } from "react-bootstrap";
import { SplitButton } from "primereact/splitbutton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal/ModalForm";
import axios from "axios";
import QueryString from "qs";
import SidebarComponent from "@/components/Sidebar";
export default function Home({ modal, openModal, data }) {
  const [visibleRight, setVisibleRight] = useState(false);
  const [showModal, setShowModal] = useState(modal);
  const [employees, setEmployees] = useState(data);
  const [employee, setEmployee] = useState([]);
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
      const response = await axios.get(`api/handlerEmployees?type=employees`, {
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
      command: (e) => {
        setVisibleRight(true);
        setEmployee(e.item.data);
      },
    },
    {
      label: "Eliminar empleado",
      icon: "pi pi-times",
      command: (e) => {},
    },
  ];

  const actionsTemplate = (option) => {
    items.map((item) => {
      item.data = option;
    });
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
