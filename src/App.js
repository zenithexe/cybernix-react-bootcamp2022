
import { useState, useEffect } from 'react';
import './App.css';
import './registerForm.css';

function App() {

  const formFields = {username:"",firstname:"",lastname:"",email:"",password:"",birthday:"",address:""}
  const [formValues,setFormValues] = useState(formFields);
  const [errorMessages,setErrorMessages] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) =>{
    console.log(formValues);
    setFormValues({...formValues,[e.target.name]:e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submited",formValues);
    setErrorMessages(validate(formValues));
    setIsSubmit(true);
  }

  const validate = (values) => {
    const errors = {}
    const regex = {
      email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      username: /^[a-zA-Z0-9_]*$/,
      password: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
      fullname: /^[A-Za-z]+$/
    };

    if(!values.username){
      errors.username = "Username is required.";
    }
    else if(/^[0-9_].*$/.test(values.username)){
      errors.username = "Username cannot start with a number or underscore.";
    }
    else if(!regex.username.test(values.username)){
      errors.username = "Username can only have letters,numbers and underscore.";
    }


    if(!values.firstname){
      errors.firstname = "First Name is required.";
    }
    else if(!regex.fullname.test(values.firstname)){
      errors.firstname = "First Name can only have letters.";
    }

    if(!values.lastname){
      errors.lastname = "Last Name is required.";
    }
    else if(!regex.fullname.test(values.lastname)){
      errors.lastname = "Last Name can only have letters.";
    }

    if(!values.email){
      errors.email = "Email is required.";
    }
    else if(!regex.email.test(values.email)){
      errors.email = "Invalid Email.";
    }

    if(!values.password){
      errors.password = "Password is required."
    }
    else if(values.password.length<6){
      errors.password = "Password must be more then 6 characters."

    }

    if(!values.birthday){
      errors.birthday = "DOB is required."
    }

    if(!values.address){
      errors.address = "Address is required."
    }

    return errors;
  }
  
  useEffect(()=>{
    if(Object.keys(errorMessages).length===0 && isSubmit){
      console.log("Final Submit",formValues)
      alert(`You have successfully registered.
      Username : ${formValues.username}
      Name : ${formValues.firstname} ${formValues.lastname}
      Address : ${formValues.address}
      Email : ${formValues.email}
      DOB : ${formValues.birthday}
      `)
    }
  },[errorMessages])


  return (
    <div class="registerForm">
      
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <label>Username</label>
        <div>
          <input
            type="text"
            name="username"
            placeholder='Username'
            onChange={handleChange}  
          ></input>
        </div>
        <div class="error">{errorMessages.username}</div>
        <p></p>
        <label>First Name</label>
        <div>
          <input
            type="text"
            name="firstname"
            placeholder='First Name'
            onChange={handleChange}  
          ></input>
        </div>
        <div class="error">{errorMessages.firstname}</div>
        <p></p>

        <label>Last Name</label>
        <div>
          <input
            type="text"
            name="lastname"
            placeholder='Last Name'
            onChange={handleChange}  
          ></input>
        </div>
        <div class="error">{errorMessages.lastname}</div>
        
        <p></p>
        <label>Address</label>
        <div>
          <input
            class = "addressInput"
            type="text"
            name="address"
            placeholder='Address'
            onChange={handleChange} 
          ></input>
        </div>
        <div class="error">{errorMessages.address}</div>
        
        
        <p></p>
        <label>Email</label>
        <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            ></input>
        </div>
        <div class="error">{errorMessages.email}</div>
        <p></p>

        <label>Password</label>
        <div>
          <input
            type="password"
            name="password"
            placeholder='Password'
            onChange={handleChange}  
          ></input>
        </div>
        <div class="error">{errorMessages.password}</div>
        <p></p>

        <label>Date of Birth</label>
        <div>
          <input
            type="date"
            name="birthday"
            placeholder='Birthday'
            onChange={handleChange}  
          ></input>
        </div>
        <div class="error">{errorMessages.birthday}</div>
        
        


        <p></p>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
