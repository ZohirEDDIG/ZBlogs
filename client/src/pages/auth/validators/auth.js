const registerFullNameValidator = {
    required: {
        value: true, 
        message: 'Full name is required', 
    },
    pattern: {
        pattern: { value: /^[A-Za-z]+( [A-Za-z]+)*$/ },
        message: 'Please enter a valid full name', 
    },
};

const registerEmailValidator = {
    required: {
        value: true, 
        message: 'Email is required', 
    }, 
    pattern: { 
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
        message: 'Please enter a valid email', 
    },
};

const registerPasswordValidator = {
    required: {
        value: true, 
        message: 'Password is required',
    }, 
    pattern: { 
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@!$#?&]{6,14}$/, 
        message: 'Password must be 6–14 characters, include uppercase, lowercase, and a number', 
    },
};

const loginEmailValidator = {
    required: {
        value: true, 
        message: 'Email is required', 
    }, 
}

const loginPasswordValidator = {
    required: {
        value: true, 
        message: 'Password is required', 
    }, 
}


export  { registerFullNameValidator, registerEmailValidator, registerPasswordValidator, loginEmailValidator, loginPasswordValidator };