import { useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";

/**
 * Renders the SidebarComponent and handles various events and state changes.
 *
 * @param {Object} props - The props of the SidebarComponent.
 * @param {function} props.setVisible - The function to set the visibility of the sidebar.
 * @param {boolean} props.visibleRight - A boolean indicating whether the sidebar is visible or not.
 * @param {Object} props.employee - The employee object.
 * @return {JSX.Element} The rendered SidebarComponent.
 */
export default function SidebarComponent({
  setVisible,
  visibleRight,
  employee,
}) {
  const [movementEmployees, setMovementEmployees] = useState([]);
  const [err, setErr] = useState("");

  /**
   * Handles the change event.
   *
   * @param {Event} event - The event object.
   * @return {undefined} This function does not return a value.
   */
  const handleChange = (event) => {
    getDataMovements(event.target.value);
  };

  /**
   * Hides the element and resets the movement employees.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  const hide = () => {
    setVisible();
    setMovementEmployees([]);
  };

  /**
   * Retrieves data movements for a specific month.
   *
   * @param {string} month - The month for which to retrieve data movements.
   * @return {Promise} A promise that resolves with the retrieved data movements.
   */
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
                <Form.Control
                  id="month"
                  name="month"
                  as="select"
                  onChange={handleChange}
                >
                  <option value="0">Seleccionar un mes..</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </Form.Control>
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
