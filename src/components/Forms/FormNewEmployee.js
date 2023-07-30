import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function FormNewEmployee({ getDataForm, formData, employee }) {
  const handleChange = (event) => {
    if (employee) {
      employee[event.target.name] = event.target.value;
    }
    getDataForm({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Form id="formNewEmployee">
      <div className="row p-2">
        <div className="col-6">
          <div className="form-group">
            <label>Num. empleado:</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-hashtag"></i>
              </span>
              <Form.Control
                type="number"
                id="employeeNumber"
                value={employee ? employee.employeeNumber : ""}
                name="employeeNumber"
                onChange={handleChange}
                placeholder="Num. de empleado"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row p-2">
        <div className="col-6">
          <div className="form-group">
            <label>Nombre:</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <Form.Control
                value={employee ? employee.firstName : ""}
                id="firstName"
                name="firstName"
                placeholder="Nombre"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label>Apellidos:</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <Form.Control
                value={employee ? employee.lastName : ""}
                id="lastName"
                name="lastName"
                onChange={handleChange}
                placeholder="Apellidos"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row p-2">
        <div className="col-6">
          <div className="form-group">
            <label>Rol:</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-id-card"></i>
              </span>
              <Form.Control
                value={employee ? employee.employeeRol : ""}
                id="employeeRol"
                name="employeeRol"
                as="select"
                onChange={handleChange}
              >
                <option value="">Seleccionar rol...</option>
                <option value="chofer">Chofer</option>
                <option value="cargador">Cargador</option>
                <option value="auxiliar">Auxiliar</option>
              </Form.Control>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
