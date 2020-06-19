
import { connect } from "react-redux"
import { reduxForm } from "redux-form"
import CreditCardForm from "../components/CreditCardModal/CreditCardModal.jsx"

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.userCabinetOrders.errorMessage
  }
}

const CreditCardModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "creditcard"
  })(CreditCardForm)
)

export default CreditCardModal
