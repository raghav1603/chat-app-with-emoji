import React, { Component } from "react";
import axios from "axios";
import "../App";

const url = "http://localhost:3000//";

class Login
 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        emailId: "",
        password: ""
      },
      formErrorMessage: {
        emailId: "",
        password: "",
      },
      formValid: {
        emailId: false,
        password: false,
        buttonActive: false
      },
      successMessage: "",
      errorMessage: ""
    };
  }

  loginUser = (event) => {
    /* 
      Prevent page refresh on form submission and
      Make aN axios PUT request to http://localhost:3080/bookBuffet/:emailId with form data 
      and handle success and error cases 
    */
    event.preventDefault();
    this.setState({ errorMessage: "", successMessage: "" })
    // console.log(this.state.form)
    axios.put(url + this.state.form.emailId, this.state.form)
      .then(response => {
        console.log(response.data.message)
        this.setState({ successMessage: response.data.message, errorMessage: "" });
      }).catch(error => {
        if (error.response) {
          this.setState({ errorMessage: error.response.data.message })
        } else {
          this.setState({ errorMessage: "server error" })
        }
      })
  }


  handleChange = (event) => {
    /* 
      invoke whenever any change happens in any of the input fields
      and update form state with the value. Also, invoke validateField() method to validate the entered value
    */
   const target = event.target;
    const value = target.value;
    const name = target.name;
    const { form } = this.state;
    
    this.setState({ form: { ...form, [name]: value } });
    this.validateField(name, value);
  }

  validateField = (fieldName, value) => {
    /* 
      Perform Validations and assign error messages,
      Also, set the value of buttonActive after validation of the field 
    */

    let tempValid = this.state.formValid;
    let tempError = this.state.formErrorMessage;
    let stringVal = String(value);
    
    switch (fieldName) {
      case "emailId":

        if (value === "") {
          tempError.emailId = "Field required"
          tempValid.emailId = false
        }
        else if (!stringVal.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
          tempValid.emailId = false;
          tempError.emailId = "Please enter valid email";
        }
        else {
          tempValid.emailId = true;
          tempError.emailId = " ";
        }
        break;
      case "password":
        if (value === "") {
          tempError.password = "Field required";
          tempValid.password = false;
        }
        else if (value.length <= 6 ) {
          tempError.password = "Password too weak";
          tempValid.password = false;
        }
        else {
          tempError.password = "";
          tempValid.password = true;
        }
        break;
     
      default:
        break;
    }
    tempValid.buttonActive =
      tempValid.emailId  &&
      tempValid.password

    this.setState({ formErrorMessage: tempError, formValid: tempValid, successMessage: ' ' })
  }

  render() {
    return (
      <React.Fragment>
        <div className="Login
         container-fluid">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <br />
              <div className="card">
                <div className="card-header bg-custom">
                  <h4>Welcome to Login Screen</h4>
                </div>
                <div className="card-body">
                  {/* create form as per the view given in screenshots */}
                  <form className='Login
                  ' onSubmit={this.loginUser}>
                    <div className="form-group">
                      <label htmlFor="emailId">Email Id </label>
                      <input
                        type="text"
                        name="emailId"
                        id="emailId"
                        placeholder="Enter your email"
                        // value={this.state.formValue.customerName}
                        onChange={this.handleChange}
                        className="form-control"
                      />

                      <span name="emailIdError" className="text-danger">
                        {this.state.formErrorMessage.emailId}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="enter your Password"
                        // value={this.state.formValue.customerName}
                        onChange={this.handleChange}
                        className="form-control"
                      />

                      <span name="passwordError" className="text-danger">
                        {this.state.formErrorMessage.password}
                      </span>
                    </div>
                    
                    <button type="submit" className="btn btn-primary" name="bookBuffet"
                      disabled={!this.state.formValid.buttonActive}>Login</button>
                  </form>
                  <br />
                  <span name="successMessage" className="text-success text-bold">
                    {this.state.successMessage}
                  </span>
                  <span name="errorMessage" className="text-danger text-bold">
                    {this.state.errorMessage}
                  </span>
                  {/* Display success or error messages as given in QP */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login
;