import { Link } from 'react-router-dom';

const Title = ({ heading, paragraph }) => {
    return (
        <div className='flex flex-col gap-y-2'>

            <Link to='/'>

                <img className='w-10 mx-auto' src='/logo.svg' alt='ZBlogs logo' />

            </Link>

            <h1 className='text-xl font-medium text-center'>{heading}</h1>

            <p className='text-gray-600 text-xs sm:text-sm text-center'>{paragraph}</p>

        </div>
    );
};

export default Title;
