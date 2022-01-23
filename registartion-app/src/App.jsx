import React, { Component } from "react";
import { ReactDOM } from "react";
import './App.css';
import Input from './components/form-fields/Input';
import Select from "./components/form-fields/Select";
import Button from './components/form-fields/Button';
import Label from "./components/form-fields/Label";

class App extends Component {
  constructor(props) {
    super(props);
    this.ClickHandler = this.ClickHandler.bind(this);
    this.region = [
      "", "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", 
      "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
      "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
      "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
      "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ]
    this.state = {
      error: "",
      success: ""
    }
  } 
  
  ClickHandler(evt) {
    evt.preventDefault();
    this.setState({error: ""});
    Array.from(document.querySelectorAll("input[required], select[required]")).forEach((element) => element.classList.remove("required") );
    let elements = Array.from(document.querySelectorAll("input[required], select[required]"));
    
    let empty = elements.filter((element) => {
      return !element.value.trim()
    });

    empty.forEach((element) => {
        element.classList.add("required");
    });
    
    
  
    let errors = [];
    if (empty) {
      empty.forEach((element) => {
        if (element.name !== "officenumber") {
            let name = element.name;
            let label = document.querySelector(`label[for="${name}"]`).textContent;
            errors.push(label);
        }
      });
      if (errors.length) {
        this.setState({error: `The following field(s) should not be empty: ${errors.join(", ")}`});
      } else {
        elements.map((element) => {
          element.value = "";
        });
        this.setState({
          success: "Enrolled Successful"
        });
        setTimeout(() => {
          this.setState({
            success: ""
          });
        }, 10000);
      } 
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
         <h1>Availity Registration</h1>
        </header>
        <main>
          <div className="success">{this.state.success}</div>
          <div className="error-msg">{this.state.error}</div>
          <form className="form-container">
            <fieldset>
              <div className="name-fields">
                 <div className="first-name">
                   <Label name="firstname">First Name</Label>
                   <Input type="text" className="first-name-input" id="firstname" name="firstname" required="true"/>
                 </div>
                 <div className="last-name">
                   <Label name="lastname">Last Name</Label>
                   <Input type="text" className="last-name-input" id="lastname" name="lastname" required="true"/>
                 </div>
              </div>
              <div className="npi-number">
                <Label name="npinumber">NPI Number</Label>
                <Input type="text" className="npi-number-input" id="npinumber" name="npinumber" required="true"/>
              </div>
              <div className="business-address">
                <div className="street-address-container">
                  <div className="street-address">
                    <Label name="streetaddress">Street Address</Label>
                    <Input type="text" className="street-address-input" id="streetaddress" name="streetaddress" required="true"/>
                  </div>
                  <div className="office-number">
                    <Label name="officenumber">Suite/Office No.</Label>
                    <Input type="text" className="office-number-input" id="officenumber" name="officenumber" required="false"/>
                  </div>
                </div>
                <div className="region-container">
                  <div className="city-container">
                    <Label name="city">City</Label>
                    <Input type="text" className="city-input" id="city" name="city" required="true"/>
                  </div>
                  <div className="state-container">
                    <Label name="state">State</Label>
                   <Select id="state" className="state-select" name="state" required="true">
                      {this.region.map((state, index) => {
                        return <option key={index} value={state}>{state}</option>
                      })}
                   </Select>
                  </div>
                  <div className="zip-code-container">
                    <Label name="zipcode">Zip Code</Label>
                    <Input type="text" className="zip-code-input" id="zipcode" name="zipcode" required="true"/>
                  </div>
                </div>
              </div>
              <div className="telephone-container">
                <Label name="telephone">Telephone</Label>
                <Input type="tel" className="telephone-input" id="telephone" name="telephone" required="true"/>
              </div>
              <div className="email-container">
                <Label name="email">EMail</Label>
                <Input type="email" className="email-input" id="email" name="email" required="true"/>
              </div>
              <div className="button-container">
                <Button type="submit" className="submission" handler={this.ClickHandler}>Submit</Button>
              </div>
            </fieldset>
          </form>
        </main>
      </div>
    );
  }
}

export default App;
