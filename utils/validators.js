
const isEmpty = (string) => {
    if(string.trim() === ""){
        return true
    }else{
        return false
    }
};

const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email.match(emailRegEx)){
        return true;
    }else{
        return false;
    }
}

const validateLoginData = (data) => {
    let errors = {};
    if(isEmpty(data.email)){
        errors.email= "Email address must not be empty"
    };
    if(isEmpty(data.password)){
        errors.password = "Password must not be empty"
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
};

const validateSignUpData = (data) => {
    let errors = {}

    if(isEmpty(data.email)){
        errors.email = "Email address must not be empty"
    }else if(!isEmail(data.email)){
        errors.email = "Email address is not valid"
    }

    if(isEmpty(data.firstName)){
        errors.firstName= "Firstname address must not be empty"
    };
    if(isEmpty(data.lastName)){
        errors.lastName = "Lastname must not be empty"
    };
    if(isEmpty(data.password)){
        errors.password= "Password address must not be empty"
    };
    if(isEmpty(data.phoneNumber)){
        errors.phoneNumber = "Phonenumber must not be empty"
    };
    if(isEmpty(data.username)){
        errors.username = "Username must not be empty"
    };

    return  {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

const validateUpdateData = (data) => {
    let errors = {}

    if(isEmpty(data.email)){
        errors.email = "Email address must not be empty"
    }else if(!isEmail(data.email)){
        errors.email = "Email address is not valid"
    }

    if(isEmpty(data.firstName)){
        errors.firstName= "Firstname address must not be empty"
    };
    if(isEmpty(data.lastName)){
        errors.lastName = "Lastname must not be empty"
    };
    if(isEmpty(data.password)){
        errors.password= "Password address must not be empty"
    };
    if(isEmpty(data.phoneNumber)){
        errors.phoneNumber = "Phonenumber must not be empty"
    };
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
};


module.exports = {validateLoginData, validateSignUpData, validateUpdateData}