import { Loading, NoDataFound } from '@/components';

import useBlog from '../context/useBlog';
import SimilarBlogCard from './SimilarBlogCard';

const SimilarBlogs = () => {
    const { blogId, getSimilarBlogsMutation } = useBlog();

    return (
        <div className='h-full flex flex-col gap-y-4'>

            <h1 className='text-2xl'>Similar Blogs</h1>

            {
                getSimilarBlogsMutation.isPending 

                ?   <Loading loadingMessage='Fetching similar Blogs' />

                :   getSimilarBlogsMutation.isSuccess 

                ?   
                    (
                        getSimilarBlogsMutation.data.data.blogs.length === 1

                        ?   <NoDataFound noDataFoundMessage='No Similar Blogs Found' />

                        :   <>

                            
                                {
                                    getSimilarBlogsMutation.data.data.blogs.map((blog) => {
                                        if (blog.blogId === blogId) return;

                                        return <SimilarBlogCard key={blog.blogId} blog={blog} />

                                    })
                                }

                            </>
                    )

                :   getSimilarBlogsMutation.isError

                ?   <p className='error'>Something went wrong while fetching similar blogs. Please refresh the page or try again later</p> 

                :   null
            }

        </div>
    );
};

export default SimilarBlogs;