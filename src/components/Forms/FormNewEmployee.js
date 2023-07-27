import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function FormNewEmployee({ getDataForm }) {
  const [formData, setFormData] = useState({});
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    getDataForm(formData);
  };

  return (
    <Form id="formNewEmployee">
      <div className="row p-2">
        <div className="col-6">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-hashtag"></i>
            </span>
            <Form.Control
              type="number"
              id="employeeNumber"
              name="employeeNumber"
              onChange={handleChange}
              placeholder="Num. de empleado"
            />
          </div>
        </div>
      </div>
      <div className="row p-2">
        <div className="col-6">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <Form.Control
              id="firstName"
              name="firstName"
              placeholder="Nombre"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <Form.Control
              id="lastName"
              name="lastName"
              onChange={handleChange}
              placeholder="Apellidos"
            />
          </div>
        </div>
      </div>
      <div className="row p-2">
        <div className="col-8">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-id-card"></i>
            </span>
            <Form.Control
              id="employeeRol"
              name="employeeRol"
              as="select"
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="chofer">Chofer</option>
              <option value="cargador">Cargador</option>
              <option value="auxiliar">Auxiliar</option>
            </Form.Control>
          </div>
        </div>
      </div>
    </Form>
  );
}
