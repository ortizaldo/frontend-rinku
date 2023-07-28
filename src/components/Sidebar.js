import { useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function SidebarComponent({
  setVisible,
  visibleRight,
  data,
  employee,
}) {
  return (
    <Sidebar
      visible={visibleRight}
      position="right"
      onHide={() => setVisible(false)}
    >
      <Container fluid className="justify-content-md-center">
        <Row className="modal-header">
          <Col className="modal-title h4">
            Movimientos de {`${employee.firstName} ${employee.lastName}`}
          </Col>
        </Row>
        <Row>
          <DataTable
            value={data}
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
              field="numberDeliveries"
              header="# Entregas"
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="numberHours"
              header="# Horas"
              style={{ width: "25%" }}
            ></Column>
          </DataTable>
        </Row>
      </Container>
    </Sidebar>
  );
}
