import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { IonIcon } from '@ionic/react';
import { personOutline, mailOutline, keyOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';

import useAuth from '@/contexts/auth/useAuth';

import { registerFullNameValidator, registerEmailValidator, registerPasswordValidator } from './validators/auth';

import resetMutation from './helpers/resetMutation';

import { Title, Or, LoginWithGoogle } from './components';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { registerMutation } = useAuth();

    const onSubmit = (data) => {
        registerMutation.mutate(data);
    };


    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    useEffect(() => {
        return () => registerMutation.reset();
    }, [])

    return (
        <main className='w-screen h-screen flex justify-center items-center'>

            <div className='w-full h-full flex items-center'>

                <div className='w-[600px] min-w-[400px] max-[400px]:min-w-[350px] p-4 flex flex-col gap-y-4'>

                    {/* Title */}
                    <Title heading='Create your account' paragraph='Welcome! Please fill int the details to get started' />

                    {/* Login with Google */}
                    <LoginWithGoogle />

                    {/* Or */}
                    <Or />

                    {/* Register Form */}
                    <form className='flex flex-col gap-y-2' onSubmit={handleSubmit(onSubmit)} noValidate>

                        {/* Full Name */}
                        <div className='bg-gray-100 px-4 py-2 rounded-full flex items-center gap-x-2'>

                            <IonIcon icon={personOutline} />
                            
                            <input className='w-full' type='text' {...register('fullName', registerFullNameValidator)} placeholder='Full Name' onFocus={(e) => resetMutation(e, registerMutation)} />

                        </div>

                        {/* FUll Name Client Error */}
                        {errors?.fullName && <p className='error'>{errors.fullName.message}</p>}

                        {/* Full Name Server Error */}
                        {registerMutation.isError && registerMutation.error?.response?.data?.errors?.fullName?.message && <p className='error'>{registerMutation.error.response.data.errors.fullName.message}</p>} 

                        {/* Email */}
                        <div className='bg-gray-100 px-4 py-2 rounded-full flex items-center gap-x-2'>

                            <IonIcon icon={mailOutline} />

                            <input className='w-full' type='email' {...register('email', registerEmailValidator)} placeholder='Email' onFocus={(e) => resetMutation(e, registerMutation)}/>

                        </div>

                        {/* Email Client Error */}
                        {errors?.email && <p className='error'>{errors.email.message}</p>}

                        {/* Email Server Error */}
                        {registerMutation.isError && registerMutation.error?.response?.data?.errors?.email?.message && <p className='error'>{registerMutation.error.response.data.errors.email.message}</p>} 

                        {/* Password */}
                        <div className='bg-gray-100 px-4 py-2 rounded-full flex items-center gap-x-2'>

                            <IonIcon icon={keyOutline} />

                            <input className='w-full' type={isPasswordVisible ? 'text' : 'password'} {...register('password', registerPasswordValidator)} placeholder='Password' onFocus={(e) => resetMutation(e, registerMutation)}/>

                            <button type='button' onClick={togglePasswordVisibility}>

                                <IonIcon icon={isPasswordVisible ? eyeOutline : eyeOffOutline} />

                            </button>

                        </div>

                        {/* Password Client Error */}
                        {errors?.password && <p className='error'>{errors.password.message}</p>}

                        {/* Password Server Error */}
                        {registerMutation.isError && registerMutation.error?.response?.data?.errors?.password?.message && <p className='error'>{registerMutation.error.response.data.errors.password.message}</p>} 

                        {/* Login Error */}
                        {registerMutation.isError && registerMutation.error?.response?.data?.error && <p className='error'>{registerMutation.error.response.data.error}</p>}

                        {/* Server Error */}
                        {registerMutation.isError && registerMutation.error.message === 'Network Error' && <p className='error'>Internal server error</p>}

                        {/* Terms and Privacy */}
                        <p className='text-gray-600 text-[8px] text-center'>By registering an account you agree to our <Link className='text-black underline' to='/terms'>User agreement</Link> and <Link className='text-black underline' to='/privacy'>Privacy policy</Link>.</p>

                        {/* Register Button */}
                        <button className='bg-black text-white px-4 py-2 rounded-full' type='submit'>Register</button>

                    </form>

                    {/* Already have an account */}
                    <p className='text-gray-600 text-sm'>Already have an account? <Link className='text-black underline' to='/login'>Login</Link></p>

                </div>

                {/* Pattern */}
                <div className='w-full h-full max-[400px]:hidden pattern'></div>

            </div>

        </main>
    );
};

export default Register;