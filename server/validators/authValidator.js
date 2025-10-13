import User from '../models/User.js';

const validateRegisterData = async (registerData) => {
    const fullName = (registerData && registerData?.fullName )|| '';
    const email = (registerData && registerData?.email) || '';
    const password = (registerData && registerData?.password) || '';

    const errors = { fullName: { message: '' }, email: { message: '' }, password: { message: '' } };

    if (!fullName) {
        errors.fullName.message = 'Full name is required';
    } else if (!/^[A-Za-z]+( [A-Za-z]+)*$/.test(fullName)) {
        errors.fullName.message = 'Please enter a valid full name';
    }

    if (!email) {
        errors.email.message = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        errors.email.message = 'Please enter a valid email';
    } else {
        const user = await User.findOne({ email });
        if (user) {
            errors.email.message = 'Email already exists';
        }
    }

    if (!password) {
        errors.password.message = 'Password is required';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@!$#?&]{6,14}$/.test(password)) {
        errors.password.message = 'Password must be 6–14 characters, include uppercase, lowercase, and a number';
    }

    if (errors.fullName.message || errors.email.message || errors.password.message) {
        return errors;
    }

    return null;
};
const validateLoginData = async (loginData) => {
    const email = (loginData && loginData?.email) || '';
    const password = (loginData && loginData?.password) || '';

    const errors = { email: { message: '' }, password: { message: '' } };

    if (!email) {
        errors.email.message = 'Email is required';
    } 

    if (!password) {
        errors.password.message = 'Password is required';
    }

    if (errors.email.message || errors.password.message) {
        return errors;
    }

    return null;
};

export { validateRegisterData, validateLoginData };