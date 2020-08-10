import React from 'react';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import StatelessAppForm from './StatelessAppForm';

function StatelessApp() {
  return(
    <Container>
      <Row className="my-5 mx-5">
        <h3 className="display-4">STATELESS APPLICATION</h3>
        <p className="lead">Simply imput your application spec such as container image, endpoint, and this tool will generate deployment.yaml and service.yaml for you.</p>
      </Row>
      <Row className="my-5 mx-5">
        <StatelessAppForm></StatelessAppForm>
      </Row>
    </Container>
  );
}
export default StatelessApp;