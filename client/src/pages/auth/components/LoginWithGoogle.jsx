const LoginWithGoogle = () => {
    return (
        <button className='py-2 border-[1.5px] border-gray-300 rounded-full flex justify-center items-center gap-x-2 transition-shadow duration-300 ease-in-out hover:shadow-lg' type='button'> 

            <div>

                <img className='w-8' src='/google-logo.svg' alt='Google logo' />

            </div>

            <span>Login with Google</span>

        </button>
    );
};

export default LoginWithGoogle;