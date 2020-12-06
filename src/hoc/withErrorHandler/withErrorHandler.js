// MAIN REACT LIBRARY and component important stuff
import React from "react";

// Importing Modal shape
import Modal from "../../components/UI/Modal/Modal";
import Pux from "../Pux/Pux";
// Importing useHTTPErrorHandler hook.
import useHTTPErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [errorExists, errorConfirmedHandler] = useHTTPErrorHandler(axios);

    return (
      <Pux>
        <Modal modalClosed={errorConfirmedHandler} show={errorExists}>
          {errorExists && errorExists.message}
        </Modal>
        <WrappedComponent {...props} />
      </Pux>
    );
  };
};

export default withErrorHandler;
