const validation = (userData) => {
    const errors = {};

    if(!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(userData.email)){
        errors.email  = 'El email ingresado no es correcto';
    }
    if(!userData.email){
        errors.email = "Debe ingresar un email";
    }
    if(userData.email.length > 35){
        errors.email = "El email no puede superar los 35 caracteres"
    }
    if(!/.*\d+.*/.test(userData.password)){
        errors.password = "La contraseña debe tener almenos un número"
    }
    if(userData.password.length < 6 || userData.password.length > 10){
        errors.password = "La contraseña debe tener entre 6 y 10 caracteres"
    }

    return errors;
}

export default validation;