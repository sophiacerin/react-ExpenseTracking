import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import LoginValidation from '../Validation/LoginValidation';
import Header from '../Header/Header';

function Login() {
    const navigate = useNavigate()

    const [values, setValues]=useState({
        email:"",
        password:""
      })
    
      const[errors, setErrors]=useState("")

      const onChangeHandler =(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
      }
    
      const onSubmitHandler=(e)=>{
        e.preventDefault();
        if(Object.keys(LoginValidation(values)).length>0){
            setErrors(LoginValidation(values));
          }else{
            axios.get(`http://localhost:3000/registration?email=${values.email}&password=${values.password}`).then((result)=>{
            if(result.data && result.data.length>0){
                sessionStorage.setItem('email', values.email);
                navigate('/addExpense')
            }else{
                alert("email and password not match")
            }
            
          }).catch((err)=>{
      console.log(err, "error");
          })
          }
        }
    return (
        <div className="container-fluid">
            <div className="firstpage">
                <Header/>
                <div className="row row-1 loginrow">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <form>



                            <div className="form-group fa-icons">
                                <input type="email" className="form-control input-form"  name="email" value={values.email} onChange={onChangeHandler} placeholder="Enter email" />
                                {errors.email && <p>{errors.email}</p>}
                            </div>
                            <div className="form-group fa-icons">
                                <input type="password" className="form-control input-form" name="password" value={values.password} onChange={onChangeHandler}  placeholder="Password" />
                                {errors.password && <p>{errors.password}</p>}
                            </div>
                            <button type="submit" className="btn btn-sm signup-btn" onClick={onSubmitHandler}>Sign In</button>
                        </form>
                    </div>
                    <div className="col-md-4"></div>
                </div>

            </div>


        </div>
    );
}
export default Login;