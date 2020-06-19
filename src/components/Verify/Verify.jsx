import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

class Verify extends Component {
  constructor(props) {
    super(props)
    this.getDashboard = this.getDashboard.bind(this)
    this.verifyUser = this.verifyUser.bind(this)
  }
  async componentDidMount() {
    this.getDashboard()
    this.verifyUser()
  }
  async getDashboard() {
    await this.props.requestGetDashboard()
  }
  async verifyUser() {
    await this.props.requestVerifyUser(this.props.match.params.authToken)
  }
  

  render() {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-4 card p-5">
            <h2 className="text-center">Thank you for registering</h2>
            <Link to="/dashboard/Profile" className="text-center link-btn">Redirect to cabinet</Link>
          </div>
        </div>
      </div>
    )
  }
}

Verify.propTypes = {
  requestVerifyUser: PropTypes.func,
  requestGetDashboard: PropTypes.func,
  user: PropTypes.object,
  match: PropTypes.object
}
export default Verify