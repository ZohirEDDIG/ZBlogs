import useUser from '../context/useUser';

import { Loading, NoDataFound } from '@/components';
import { BlogPublishedCard } from './';


const BlogsPublished = () => {
    const { getUserBlogsQuery } = useUser();

    return (
        <section className='h-full flex flex-col gap-y-10'>

            {
                getUserBlogsQuery.isPending 

                ?   <Loading loadingMessage='Fetching User Blogs' />

                :   getUserBlogsQuery.isSuccess 

                ?   
                    (
                        getUserBlogsQuery.data.data.blogs.length == 0

                        ?   <NoDataFound noDataFoundMessage='No Blogs Found' />

                        :   
                            
                            getUserBlogsQuery.data.data.blogs.map((blog) => (

                                <BlogPublishedCard key={blog.blogId} blog={blog} />

                            ))
                            
                    )

                :   getLatestBlogsQuery.isError

                ?   <p className='error'>Something went wrong while fetching latest blogs. Please refresh the page or try again later</p> 

                :   null
            }

        </section>
    );
};


export default BlogsPublished;