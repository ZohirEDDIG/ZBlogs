import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { IonIcon } from '@ionic/react';
import { mailOutline, keyOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';

import useAuth from '@/contexts/auth/useAuth';

import { loginEmailValidator, loginPasswordValidator } from './validators/auth';

import resetMutation from './helpers/resetMutation';

import { Title, Or, LoginWithGoogle } from './components';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { loginMutation } = useAuth();

    const onSubmit = (data) => {
        loginMutation.mutate(data);
    };

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    useEffect(() => {
        return () => loginMutation.reset();
    }, [])

    return (
        <main className='w-screen h-screen'>

            <div className='w-full h-full flex items-center'>

                <div className='w-[600px] min-w-[400px] max-[400px]:min-w-[350px] p-4 flex flex-col gap-y-4'>

                    {/* Title */}
                    <Title heading='Login to ZBlogs' paragraph='Welcome back! Please login to continue'/>

                    {/* Login with Google */}
                    <LoginWithGoogle />

                    {/* Or */}
                    <Or />

                    {/* Login Form */}
                    <form className='flex flex-col gap-y-2' onSubmit={handleSubmit(onSubmit)} noValidate>

                        {/* Email */}
                        <div className='bg-gray-100 px-4 py-2 border-1 border-gray-200 rounded-full flex items-center gap-x-2 transition-all duration-300 ease-in-out  focus-within:border-violet-300'> 

                            <IonIcon icon={mailOutline} />

                            <input className='w-full' type='email' {...register('email', loginEmailValidator)} placeholder='Email' onFocus={(e) => resetMutation(e, loginMutation)} />

                        </div>

                        {/* Email Client Error */}
                        {errors?.email && <p className='error'>{errors.email.message}</p>}

                        {/* Email Server Error */}
                        {loginMutation.isError && loginMutation.error?.response?.data?.errors?.email?.message && <p className='error'>{loginMutation.error.response.data.errors.email.message}</p>} 

                        {/* Password */}
                        <div className='bg-gray-100 px-4 py-2 border-1 border-gray-200 rounded-full flex items-center gap-x-2  transition-all duration-300 ease-in-out  focus-within:border-violet-300'>

                            <IonIcon icon={keyOutline} />

                            <input className='w-full' type={isPasswordVisible ? 'text' : 'password'} {...register('password', loginPasswordValidator)} placeholder='Password' onFocus={(e) => resetMutation(e, loginMutation)}  />

                            <button className='flex text-gray-400 transition-colors duration-300 ease-in-out hover:text-black' type='button' onClick={togglePasswordVisibility}>

                                <IonIcon icon={isPasswordVisible ?  eyeOutline : eyeOffOutline} />

                            </button>

                        </div>

                        {/* Password Client Error */}
                        {errors?.password && <p className='error'>{errors.password.message}</p>}

                        {/* Password Server Error */}
                        {loginMutation.isError && loginMutation.error?.response?.data?.errors?.password?.message && <p className='error'>{loginMutation.error.response.data.errors.password.message}</p>} 

                        {/* Login Error */}
                        {loginMutation.isError && loginMutation.error?.response?.data?.error && <p className='error'>{loginMutation.error.response.data.error}</p>}

                        {/* Server Error */}
                        {loginMutation.isError && loginMutation.error.message === 'Network Error' && <p className='error'>Internal server error</p>}

                        {/* Forgot Password */}
                        <Link className='text-gray-600 text-sm underline transition-colors duration-300 ease-in-out hover:text-black' to='/recover'>Forgot yout Password?</Link>

                        {/* Login Button */}
                        <button 
                            className={`bg-black text-white px-4 py-2 rounded-full ${loginMutation.isPending && 'cursor-auto! opacity-60 pointer-events-none'} transition-shadow duration-300 ease-in-out hover:shadow-lg`}
                            type='submit'
                            disabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending ? 'Logging in...' : 'Login'}
                        </button>

                    </form>

                    {/* Dont have an account */}
                    <p className='text-gray-600 text-sm'>You don't have an account? <Link className='underline transition-colors duration-300 ease-in-out hover:text-black' to='/register'>Register</Link></p>

                </div>

                {/* Pattern */}
                <div className='w-full h-full max-[400px]:hidden pattern'></div>

            </div>

        </main>
    );
};

export default Login;