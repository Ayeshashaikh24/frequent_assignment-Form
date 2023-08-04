import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import '../App.css'
import { Country, State, City } from "country-state-city";
import { Link, useNavigate } from "react-router-dom";
const validationSchema = Yup.object({
  firstname: Yup.string().required("firstName is required"),
  lastname: Yup.string().required("lastName is required"),
  email: Yup.string().required("Email is required"),
  gender: Yup.string().required("Gender is required").oneOf(["male", "female", "other"], "Invalid gender"),
  dateofbirth: Yup.string().required("date of birth is required"),
  country: Yup.string().required("country is required"),
  state: Yup.string().required("state is required"),
  city: Yup.string().required("city is required"),

});

const UserForm = ({ onSubmit }) => {
const navigate=useNavigate()


  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [age, setAge] = useState("");

  const [apiResponse, setApiResponse] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
   
 
    console.log(selectedOption.name)
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setSelectedCity(null);
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    const ageDiff = today - dobDate;
    const ageDate = new Date(ageDiff);
    const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    return calculatedAge;
  };

  useEffect(() => {
    if (dateOfBirth) {
      const calculatedAge = calculateAge(dateOfBirth);
      setAge(calculatedAge);
    }
  }, [dateOfBirth]);
  
  const handleDateOfBirthChange = (e) => {
     setDateOfBirth(e.target.value);
   
    console.log(e.target.value)
   
   
  };


  
  return (
    <>
    
    <div className="form">
    <nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="/">User Form</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#"></a></li>
        <li><a href="/display-info">User List</a></li>
       
      </ul>
    
    </div>
  </div>
</nav>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          gender: "",
          dateofbirth: "",
         country: "" ,
          state: "",
          city: "",
          // age:""
        }}
         validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
            console.log('Submitting form:', values);
         
            onSubmit(values);
            resetForm();
            navigate("/display-info");
          }}
      >
     {({ setFieldValue }) => (
        <Form>
          <div className="field_value">
            <label>FirstName:</label>
            <Field className="inputvalue" type="text" name="firstname" />
            <ErrorMessage name="firstname" component="div" className="error" />
          </div>
          <div className="field_value">
            <label >LastName:</label>
            <Field type="text" className="inputvalue" name="lastname" />
            <ErrorMessage name="lastname" component="div" className="error" />
          </div>
          <div className="field_value">
            <label>Email:</label>
            <Field type="email" className="inputvalue" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="field_value"> 
        
            <label className="gender-field">Gender:</label>
            <div className="gender-options">  
          <label>
              <Field type="radio" className="radio" name="gender" value="male" />
             
           Male
           </label>
       <label>
              <Field type="radio" name="gender" className="radio" value="female" />
            Female
            </label>
            </div>
            <ErrorMessage name="gender" component="div" className="error" />
          </div>
    
          <div className="field_value">
            <label>Date Of Birth : </label>
            <Field
            className="inputvalue"
              type="date"
              name="dateofbirth"
              value={dateOfBirth}
              onChange={(e) => {
                handleDateOfBirthChange(e); // Handle date of birth change
                setFieldValue("dateofbirth", e.target.value); // Update the Formik value for date of birth
              }}
            />
             <ErrorMessage name="dateofbirth" component="div" className="error" />
          </div>
          <div className="field_value">
            <label>Age: </label>
            <Field type="text" name="age" value={age}
             onChange={(e) => {
              setFieldValue("age", e.target.value);
              
            }}
            className="inputvalue"
            />
           
            <ErrorMessage name="age" component="div" className="error" />
          </div>
          <div className="field_value">
            <label>Country</label>
            <Select
             
              options={Country.getAllCountries()}
              getOptionLabel={(options) => options.name}
              getOptionValue={(options) => options.isoCode}
              value={selectedCountry  }
            
              onChange={(selectedOption) => {
                handleCountryChange(selectedOption);
                setFieldValue("country", selectedOption ? selectedOption.name : "");
              }}
             
              name="country"
            
            />
             <ErrorMessage name="country" component="div" className="error" />
          </div>
          <div className="field_value">
            <label>State</label>
            <Select
              options={State.getStatesOfCountry(selectedCountry?.isoCode)}
              getOptionLabel={(options) => options.name}
              getOptionValue={(options) => options.isoCode}
              value={selectedState}
              // onChange={handleStateChange}
              onChange={(selectedOption) => {
                handleStateChange(selectedOption);
                setFieldValue("state", selectedOption ? selectedOption.name : "");
              }}
            />
              <ErrorMessage name="state" component="div" className="error" />
          </div>
          <div className="field_value">
            <label>City</label>
            <Select
              options={City.getCitiesOfState(
                selectedCountry?.isoCode,
                selectedState?.isoCode
              )}
              getOptionLabel={(options) => options.name}
              getOptionValue={(options) => options.name}
              value={selectedCity}
              onChange={(selectedOption) => {
               handleCityChange(selectedOption);
                setFieldValue("city", selectedOption ? selectedOption.name : "");
              }}
            />
            <ErrorMessage name="city" component="div" className="error" />
          </div>

          <button type="submit">Create User</button>
        </Form>
      )}
      </Formik>
     
    </div>
    </>
  );
};

export default UserForm;
