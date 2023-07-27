import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export default function FormNewEmployee(props) {
  return (
    <Form>
      <div className="row p-2">
        <div className="col-6">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-hashtag"></i>
            </span>
            <Form.Control placeholder="Num. de empleado" />
          </div>
        </div>
      </div>
      <div className="row p-2">
        <div className="col-6">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <Form.Control placeholder="Nombre" />
          </div>
        </div>
        <div className="col-6">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <Form.Control placeholder="Apellidos" />
          </div>
        </div>
      </div>
      <div className="row p-2">
        <div className="col-8">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-id-card"></i>
            </span>
            <Form.Select aria-label="Default select example">
              <option value="0">Seleccionar rol</option>
              <option value="chofer">Chofer</option>
              <option value="cargador">Cargador</option>
              <option value="auxiliar">Auxiliar</option>
            </Form.Select>
          </div>
        </div>
      </div>
    </Form>
  );
}
