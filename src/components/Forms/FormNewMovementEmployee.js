import { InputNumber } from "primereact/inputnumber";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import _ from "underscore";

/**
 * Renders a form for creating a new movement for an employee.
 *
 * @param {Object} getDataForm - a function to update the form data
 * @param {Object} formData - the current form data
 * @param {Array} employees - an array of employee objects
 * @return {JSX.Element} - the rendered form component
 */
function FormNewMovementEmployee({ getDataForm, formData, employees }) {
  const [employee, setEmployee] = useState({});
  const [err, setErr] = useState("");

  /**
   * Handles the change event for the input field.
   *
   * @param {Event} event - The event object representing the change event.
   * @return {void} No return value.
   */
  const handleChange = (event) => {
    getDataForm({
      ...formData,
      [event.target.name]: event.target.value,
    });

    if (event.target.name == "employee") {
      const employee = _.where(employees, { _id: event.target.value })[0];
      setEmployee(employee);
    }
  };

  /**
   * Generate the options for a select element based on the employees array.
   *
   * @return {Array} An array of option elements with the employee names and IDs.
   */
  const addOptionsToSelect = () => {
    return employees.map((employee) => {
      return (
        <option
          key={employee._id}
          value={employee._id}
        >{`${employee.firstName} ${employee.lastName}`}</option>
      );
    });
  };

  return (
    <Form id="formNewMovementEmployee">
      <div className="row p-2">
        <div className="col-12">
          <div className="form-group">
            <label>Empleado:</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <Form.Control
                id="employee"
                name="employee"
                as="select"
                onChange={handleChange}
              >
                <option value="">Seleccionar empleado...</option>
                {addOptionsToSelect()}
              </Form.Control>
            </div>
          </div>
        </div>
      </div>
      <div className="row p-2">
        <div className="col-6">
          <div className="form-group">
            <label>Num. de empleado:</label>
            <span className="form-control-plaintext">
              {employee && employee.employeeNumber
                ? employee.employeeNumber
                : ""}
            </span>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label>Rol:</label>
            <span
              className="form-control-plaintext"
              style={{ textTransform: "capitalize" }}
            >
              {employee && employee.employeeRol ? employee.employeeRol : ""}
            </span>
          </div>
        </div>
      </div>
      <div className="row p-2">
        <div className="col-4">
          <div className="form-group">
            <label>Mes:</label>
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
        <div className="col-4">
          <div className="form-group">
            <label>Horas trabajadas:</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-clock"></i>
              </span>
              <Form.Control
                type="number"
                id="numberHours"
                name="numberHours"
                onChange={handleChange}
                placeholder="Capturar las horas trabajadas"
              />
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label>Cantidad de entregas:</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-send"></i>
              </span>
              <Form.Control
                type="number"
                id="numberDeliveries"
                name="numberDeliveries"
                onChange={handleChange}
                placeholder="Capturar las entregas"
              />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default FormNewMovementEmployee;
