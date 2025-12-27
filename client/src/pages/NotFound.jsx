import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <main className='w-screen h-screen'>

            <div className='w-full h-full container p-4 mx-auto flex flex-col items-center justify-center gap-2'>

                    <img 
                        className='w-[400px]'
                        src='/page-not-found.svg'
                        alt=''
                    />

                    <h1  className='text-gray-700 text-2xl font-bold'>Page Not Found</h1>

                    <p className='text-gray-500 text-center'>
                        
                        The page you are looking for does not exists. Head back to  {' '}
                        
                        <Link 
                            to='/'
                            className='underline transition-colors duration-300 ease-in-out hover:text-gray-700'
                        >
                            
                            HOME PAGE
                            
                        </Link>
                    
                    </p>

            </div>

        </main>
    );
};

export default NotFound;