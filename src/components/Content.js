import React from "react";
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  ListGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import { observer } from "mobx-react";
import Icon from "@mdi/react";
import { mdiWindowClose, mdiCheck } from "@mdi/js";
import LoginPage from "./Login";
import ErrorSnackBar from "./SnackBar";

const Content = observer(({ store }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [planId, setPlanId] = React.useState();

  const subscribePlan = (id) => {
    store.planStore.suscribePlan(id);
  };

  React.useEffect(() => {
    store.planStore.getPlanFeatures();
    store.planStore.getPlans();
  }, []);

  const plans = store.planStore.allPlans;
  const features = store.planStore.allFeatures;
  const errors = store.planStore.errorMessage;
  const success = store.planStore.successMessage;
  const isloggedIn = localStorage.getItem("token");

  if (!plans.length > 0 && !features.length > 0) {
    return (
      <div style={middleScreen}>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      <Container>
        {errors && (
          <div>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <ErrorSnackBar alertShow variant="danger" message={errors} />
              </Col>
            </Row>
          </div>
        )}
        {success && (
          <div>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <ErrorSnackBar alertShow variant="success" message={success} />
              </Col>
            </Row>
          </div>
        )}
        <Row style={titleStyle} className="justify-content-md-center">
          <Col xs={12} sm={6} md={4}>
            <h3>Choose your Plan</h3>
            <i className="bi-alarm"></i>
          </Col>
        </Row>
        <Row>
          <Col sm={4}></Col>
          <Col sm={8}>
            <CardGroup
              responsive="lg"
              style={planTitleStyle}
              className="text-center"
            >
              {plans.map((plan) => (
                <Card>
                  <Card.Body>
                    <Card.Title style={cartTitle} key={plan.id}>
                      {plan.name}
                    </Card.Title>
                  </Card.Body>
                </Card>
              ))}
            </CardGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  {features.map((feature) => (
                    <ListGroup.Item key={feature.id}>
                      {feature.name}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={8}>
            <CardGroup className="text-center">
              {plans.map((plan) => (
                <Card key={plan.id}>
                  <Card.Body>
                    <ListGroup variant="flush">
                      {plan.features.map((feature) => (
                        <>
                          <ListGroup.Item key={feature.name}>
                            <b>
                              {feature.availability ? (
                                <Icon
                                  path={mdiCheck}
                                  size={0.8}
                                  color="green"
                                />
                              ) : (
                                <Icon
                                  path={mdiWindowClose}
                                  size={0.8}
                                  color="red"
                                />
                              )}
                            </b>
                          </ListGroup.Item>
                        </>
                      ))}
                    </ListGroup>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">HK${plan.price}/Month</small>
                  </Card.Footer>
                  <Button
                    style={buttonStyle}
                    variant="outline-primary"
                    onClick={() => {
                      setPlanId(plan.id);
                      isloggedIn ? subscribePlan(plan.id) : setModalShow(true);
                    }}
                  >
                    Get the Plan
                  </Button>{" "}
                </Card>
              ))}
            </CardGroup>
          </Col>
        </Row>

        <LoginPage
          show={modalShow}
          onHide={() => setModalShow(false)}
          store={store}
          planId={planId}
        />
      </Container>
    );
  }
});

const titleStyle = {
  margin: "40px",
  color: "#4281b8",
};

const cartTitle = {
  backgroundColor: "#4281b8",
  color: "white",
  paddingTop: 10,
  height: "45px",
  borderRadius: 4,
};

const planTitleStyle = {
  border: "none",
};

const buttonStyle = {
  margin: 10,
};

const middleScreen = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
};

export default Content;
