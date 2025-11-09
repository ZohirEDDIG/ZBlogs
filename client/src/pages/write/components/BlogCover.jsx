import useWrite from '../context/useWrite';

const BlogCover = () => {
    const { blogCover, blogCoverError, handleFileChange } = useWrite();

    return (
        <div className='flex flex-col gap-y-4'>

            <div className='bg-gray-100 lg:w-[900px] lg:mx-auto border-2 border-gray-300 border-dashed aspect-video transition-colors duration-300 ease-in-out hover:bg-gray-50'>

                <label className='text-gray-500 w-full h-full flex justify-center items-center cursor-pointer select-none' htmlFor='blog-cover'>

                    {
                        blogCover ? <img src={blogCover} alt='Blog cover' /> :  <h1 className='sm:text-xl'>Blog Cover</h1>
                    }

                </label>

                <input type='file' name='blog-cover' id='blog-cover' accept='image/*' hidden onChange={handleFileChange} />

            </div>

            {blogCoverError && <p className='error lg:w-[900px] lg:mx-auto'>{blogCoverError}</p>}

        </div>
    );
};

export default BlogCover;