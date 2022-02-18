import React from "react";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import ErrorSnackBar from "./SnackBar";

const LoginPage = (props) => {
  const [inputs, setInputs] = React.useState({});
  const errors =
    props.store.planStore.errorMessage || props.store.authStore.errorMessage;

  const subscribePlan = () => {
    props.store.planStore.suscribePlan(props.planId);
  };

  const loginHandler = async () => {
    props.store.authStore.login(inputs);
    subscribePlan();
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login To Your Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errors ? (
          <div>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <ErrorSnackBar alertShow message={errors} />
              </Col>
            </Row>
          </div>
        ) : (
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                onChange={({ target }) =>
                  setInputs((state) => ({ ...state, email: target.value }))
                }
                value={inputs.email}
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                onChange={({ target }) =>
                  setInputs((state) => ({ ...state, password: target.value }))
                }
                value={inputs.password}
                type="password"
                placeholder="password"
              />
            </Form.Group>
            <Button variant="primary" onClick={() => loginHandler()}>
              Login
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default LoginPage;
