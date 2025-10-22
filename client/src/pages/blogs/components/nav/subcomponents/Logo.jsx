import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to='/'>

            <img className='w-10' src='/logo.svg' alt='ZBlogs logo' />

        </Link>
    );
}

export default Logo;