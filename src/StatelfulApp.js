import React from 'react';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import StatefulAppForm from './StatefulAppForm';

function StatefulApp() {
  return(
    <Container>
      <Row className="my-5 mx-5">
        <h3 className="display-4">STATEFUL APPLICATION</h3>
        <p className="lead">Simply imput your application spec such as container image, headless service, persistence storageand this tool will generate statefulset.yaml and healess-service.yaml for you.</p>
      </Row>
      <Row className="my-5 mx-5">
        <StatefulAppForm></StatefulAppForm>
      </Row>
    </Container>
  );
}
export default StatefulApp;