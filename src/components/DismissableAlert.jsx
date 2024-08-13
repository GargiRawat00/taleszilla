import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertDismissibleExample({curr,heading, msg,setcurr}) {

  if (curr) {
    return (
      <Alert variant="info" onClose={() =>{ setcurr(false);} }dismissible>
        <Alert.Heading>{heading}</Alert.Heading>
        <p>
          {msg}
        </p>
      </Alert>
    );
  }
  
}

export default AlertDismissibleExample;