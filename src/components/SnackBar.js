import React from "react";
import { Alert } from "react-bootstrap";

const ErrorSnackBar = (props) => {
  const [show, setShow] = React.useState(true);

  if (show) {
    return (
      <Alert
        transition="Fade"
        variant={props.variant}
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>
          {props.variant === "success" ? "Congratulations!" : "Opps!"}
        </Alert.Heading>
        <p>{props.message}</p>
      </Alert>
    );
  }
  return window.location.reload();
};

export default ErrorSnackBar;
