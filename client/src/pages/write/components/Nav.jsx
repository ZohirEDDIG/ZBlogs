import { Link } from 'react-router-dom';

import useWrite from '../context/useWrite';

const Nav = () => {
    const { handlePublish, handleSaveDraft, uploadBlogMutation } = useWrite();

    return (
        <nav className='bg-white'>

            <div className='ctn border-b border-gray-100 flex justify-between items-center'>

                <div className='flex items-center'>
                    
                    <Link to='/'>

                        <img className='w-10' src='/logo.svg' alt='ZBlogs logo' />

                    </Link>

                    <h1>New Blog</h1>

                </div>

                <div className='flex items-center gap-x-2 sm:gap-x-4'>

                    <button 
                        className={`bg-black text-white text-sm md:text-base px-4 py-1.5 rounded-full ${uploadBlogMutation.isPending && 'opacity-60 cursor-auto! pointer-events-none'} transition-shadow duration-300 ease-in-out hover:shadow-lg`}
                        type='button' 
                        onClick={handlePublish}
                        disabled={uploadBlogMutation.isPending}
                    >
                        Publish
                    </button>

                    <button 
                        className={`bg-gray-100 text-sm md:text-base px-4 py-1.5 rounded-full ${uploadBlogMutation.isPending && 'opacity-60 cursor-auto! pointer-events-none'}  transition-shadow duration-300 ease-in-out hover:shadow-lg`}
                        type='button'
                        onClick={handleSaveDraft}
                        disabled={uploadBlogMutation.isPending}
                    >
                        Save Draft
                    </button>

                </div>

            </div>

        </nav>
    );
};

export default Nav;