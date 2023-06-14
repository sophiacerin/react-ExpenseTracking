export default function LoginValidation(values) {
    let errors={};

    
    if(!values.email){
        errors.email="email required"
    }else if(/"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"/.test(values.email)){
        errors.email="email invalid"
    }
    if(!values.password){
        errors.password="password required"
    }else if(/"^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$"/.test(values.password)){
        errors.password="password invalid"
    }

    // confirm password 

    // if(!values.password2.trim()){
    //     errors.password="password required"
    // }else if(values.password !== values.password2){
    //     errors.password2="password does not match"
    // }

    return errors;
}