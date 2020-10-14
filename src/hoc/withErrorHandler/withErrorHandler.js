// MAIN REACT LIBRARY and component important stuff
import React, {Component} from 'react'

// Importing Modal shape
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux'

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    state = {
      error: null
    }

    constructor () {
      super();
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      })
      this.resInterceptor = axios.interceptors.response.use(res => res, err => {
        this.setState({error: err})
      })
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})
    }

    componentWillUnmount = () => {
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }

    render = () => {
      return (
        <Aux>
          <Modal 
          modalClosed={this.errorConfirmedHandler}
          show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      )
    }
  }
}

export default withErrorHandler