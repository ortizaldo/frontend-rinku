import { Form } from "react-bootstrap";
import _ from "underscore";

/**
 * Renders a form for creating a new employee.
 *
 * @param {object} formData - The form data.
 * @param {function} getDataForm - The function to get the form data.
 * @param {object} employee - The employee object.
 * @param {function} setEmployee - The function to set the employee object.
 * @return {JSX.Element} - The form component.
 */
export default function FormNewEmployee({ register, errors }) {
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
                {...register("employeeNumber", {
                  required: "Employee number is required",
                })}
                type="number"
                id="employeeNumber"
                name="employeeNumber"
                placeholder="Num. de empleado"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
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
                {...register("firstName", { required: true })}
                id="firstName"
                name="firstName"
                placeholder="Nombre"
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
                {...register("lastName", { required: true })}
                id="lastName"
                name="lastName"
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
                {...register("employeeRol", { required: true })}
                id="employeeRol"
                name="employeeRol"
                as="select"
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
