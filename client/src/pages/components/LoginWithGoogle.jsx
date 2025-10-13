const LoginWithGoogle = () => {
    return (
        <button className='py-1 border-[1.5px] border-gray-300 rounded-full flex justify-center items-center gap-x-2' type='button'> 

            <div>

                <img src='/google-logo.svg' alt='Google logo' className='w-8' />

            </div>

            <span>Login with Google</span>

        </button>
    );
};

export default LoginWithGoogle;