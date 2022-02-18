import React from "react";
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  ListGroup,
} from "react-bootstrap";
import { observer } from "mobx-react";
import Icon from "@mdi/react";
import { mdiWindowClose, mdiCheck } from "@mdi/js";

const Content = observer(({ store }) => {
  React.useEffect(() => {
    store.planStore.getPlanFeatures();
    store.planStore.getPlans();
  }, []);

  return (
    <Container>
      <Row style={titleStyle} className="justify-content-md-center">
        <Col xs={12} sm={6} md={4}>
          <h3>Choose your Plan</h3>
          <i className="bi-alarm"></i>
        </Col>
      </Row>
      <Row>
        <Col sm={4}></Col>
        <Col sm={8}>
          <CardGroup style={planTitleStyle} className="text-center">
            {store.planStore.allPlans.map((plan) => (
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
                {store.planStore.allFeatures.map((feature) => (
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
            {store.planStore.allPlans.map((plan, i) => (
              <Card key={plan.id}>
                <Card.Body>
                  <ListGroup variant="flush">
                    {plan.features.map((feature) => (
                      <>
                        <ListGroup.Item key={feature.name}>
                          <b>
                            {feature.availability ? (
                              <Icon path={mdiCheck} size={0.8} color="green" />
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
                    ;
                  </ListGroup>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">HK${plan.price}/Month</small>
                </Card.Footer>
              </Card>
            ))}
            ;
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
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

export default Content;
