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
export default function FormNewEmployee({
  register,
  errors,
  setEmployee,
  employee,
}) {
  return (
    <Form id="formNewEmployee">
      <div className="row p-2">
        <div className="col-6">
          <div className="form-group">
            <label>Num. empleado:</label>
            <Form.Control
              {...register("employeeNumber", {
                required: "Employee number is required",
              })}
              type="number"
              id="employeeNumber"
              name="employeeNumber"
              placeholder="Num. de empleado"
              className={`form-control ${
                errors.employeeNumber ? "is-invalid" : ""
              }`}
              onChange={(e) => {
                setEmployee({
                  ...employee,
                  employeeNumber: e.currentTarget.value,
                });
              }}
            />
            <div className="invalid-feedback">
              {errors.employeeNumber?.message}
            </div>
          </div>
        </div>
      </div>
      <div className="row p-2">
        <div className="col-6">
          <div className="form-group">
            <label>Nombre:</label>
            <Form.Control
              {...register("firstName", { required: true })}
              id="firstName"
              name="firstName"
              placeholder="Nombre"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              onChange={(e) => {
                setEmployee({
                  ...employee,
                  firstName: e.currentTarget.value,
                });
              }}
            />
            <div className="invalid-feedback">{errors.firstName?.message}</div>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label>Apellidos:</label>
            <Form.Control
              {...register("lastName", { required: true })}
              id="lastName"
              name="lastName"
              placeholder="Apellidos"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              onChange={(e) => {
                setEmployee({
                  ...employee,
                  lastName: e.currentTarget.value,
                });
              }}
            />
            <div className="invalid-feedback">{errors.lastName?.message}</div>
          </div>
        </div>
      </div>
      <div className="row p-2">
        <div className="col-6">
          <div className="form-group">
            <label>Rol:</label>
            <Form.Control
              {...register("employeeRol", { required: true })}
              id="employeeRol"
              name="employeeRol"
              as="select"
              className={`form-control ${
                errors.employeeRol ? "is-invalid" : ""
              }`}
              onChange={(e) => {
                setEmployee({
                  ...employee,
                  employeeRol: e.currentTarget.value,
                });
              }}
            >
              <option value="">Seleccionar rol...</option>
              <option value="chofer">Chofer</option>
              <option value="cargador">Cargador</option>
              <option value="auxiliar">Auxiliar</option>
            </Form.Control>
            <div className="invalid-feedback">
              {errors.employeeRol?.message}
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
