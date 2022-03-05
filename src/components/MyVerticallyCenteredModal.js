import React from "react";
import { Modal,Button } from "react-bootstrap";
import Chart from "./Chart";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="m"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          15人以下球隊人數統計
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Chart/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
