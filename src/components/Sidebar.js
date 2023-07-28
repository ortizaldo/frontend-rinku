import { useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import axios from "axios";
import QueryString from "qs";

export default function SidebarComponent({
  setVisible,
  visibleRight,
  employee,
}) {
  const [movementEmployees, setMovementEmployees] = useState([]);
  const [err, setErr] = useState("");

  const handleChange = (event) => {
    getDataMovements(event.value);
  };

  const hide = () => {
    setVisible();
    setMovementEmployees([]);
  };

  const getDataMovements = async (month) => {
    try {
      const response = await axios.post(
        `api/handlerEmployees`,
        {
          month: month,
          employee: employee._id,
          rol: employee.rol,
        },
        {
          params: {
            type: "employee-salary",
            typePost: "/get-salary",
          },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(
        "%cSidebar.js line:43 response.data",
        "color: #007acc;",
        response.data
      );
      response.data.data.month = month;
      setMovementEmployees([response.data.data]);
    } catch (error) {
      setErr(error.message);
    }
  };
  return (
    <Sidebar visible={visibleRight} position="right" onHide={() => hide()}>
      <Container fluid className="justify-content-md-center">
        <Row className="modal-header">
          <Col className="modal-title h4">
            Movimientos de {`${employee.firstName} ${employee.lastName}`}
          </Col>
        </Row>
        <Row className="modal-body">
          <div className="col-4">
            <div className="form-group">
              <label>Calcular el pago del mes:</label>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-calendar"></i>
                </span>
                <InputNumber
                  inputId="month"
                  name="month"
                  onValueChange={(e) => handleChange(e)}
                  min={1}
                  max={12}
                />
              </div>
            </div>
          </div>
        </Row>
        <Row className="p-4">
          <DataTable
            value={movementEmployees}
            size="small"
            tableStyle={{ minWidth: "50rem" }}
            stripedRows
          >
            <Column
              field="month"
              header="Mes"
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="numeroDeEntregas"
              header="Entregas"
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="horasTrabajadas"
              header="Horas trabajadas"
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="horasExtras"
              header="Horas extras"
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="horasFaltantes"
              header="Horas faltantes"
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="salarioMensual"
              header="Salario"
              style={{ width: "25%" }}
            ></Column>
          </DataTable>
        </Row>
      </Container>
    </Sidebar>
  );
}
