import React from "react";
import './Register.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterValidation from "../Validation/RegisterValidation";
import axios from "axios";
import Header from "../Header/Header";

function Register(){
  const navigate = useNavigate()

  const [values, setValues]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })

  const[errors, setErrors]=useState("")
  // const[success, setSuccess]=useState("")

  const onChangeHandler =(e)=>{
    setValues({...values,[e.target.name]:e.target.value})
  }

  const onSubmitHandler =(e)=>{
    e.preventDefault();
    // setSuccess("")
    if(Object.keys(RegisterValidation(values)).length>0){
      setErrors(RegisterValidation(values));
    }
    else{
    // setSuccess("successfully validated")
    axios.post('http://localhost:3000/registration',values).then((result)=>{
      console.log(result.data);
      navigate('/login')
    }).catch((err)=>{
      console.log(err, "error");
    })
    }
  }
    return(
      
        <div className="container-fluid">
            <div className="firstpage">
                <Header/>
                 <div className="row row-1">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <form>
                            <div className="form-group">
                                <label for="exampleInputFirstname">First Name</label>
                                <input type="email" className="form-control" name="firstName" value={values.firstName} onChange={onChangeHandler} id="exampleInpuFirstname" aria-describedby="firstname" placeholder="Enter your First Name" required/>
                                {errors.firstname && <p>{errors.firstname}</p>}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputLastname">Last Name</label>
                                <input type="email" className="form-control" name="lastName"  value={values.lastName} onChange={onChangeHandler} id="exampleInpuFirstname" aria-describedby="lasttname" placeholder="Enter your Last Name" required/>
                                {errors.lastame && <p>{errors.lastname}</p>}
                            </div>

                            <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" name="email"  value={values.email} onChange={onChangeHandler} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                                {errors.email && <p>{errors.email}</p>}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" name="password"  value={values.password} onChange={onChangeHandler}id="exampleInputPassword1" placeholder="Password"/>
                                {errors.password && <p>{errors.password}</p>}
                            </div>
                            
                            <button type="submit" className="btn btn-lg signup-btn" onClick={onSubmitHandler}>Sign Up</button>
                        </form>
                        
                    </div>
                    <div className="col-md-4"></div>
                </div>
                    
            </div>
            
                        
        </div>
    );
}

export default Register;