import useBlogs from '../context/useBlogs';

import { Loading, NoDataFound, LatestBlogCard, Pagination } from './';

const TopicBlogs = () => {
    const { topic, getTopicBlogsQuery } = useBlogs();

    return (
        <div className='h-full flex flex-col gap-y-10'>
            {
                getTopicBlogsQuery.isPending 

                ?   <Loading loadingMessage={`Fetching ${topic} Blogs...`} />

                :   getTopicBlogsQuery.isSuccess 

                ?   
                    (
                        getTopicBlogsQuery.data.data.blogs.length === 0

                        ?   <NoDataFound noDataFoundMessage='No Blogs Found' />

                        :   <>
                            
                                {
                                    getTopicBlogsQuery.data.data.blogs.map((blog) => (

                                        <LatestBlogCard key={blog.blogId} blog={blog} />

                                    ))
                                }

                                <Pagination />
                            
                            </>
                    )

                :   getTopicBlogsQuery.isError

                ?   (
                    
                        getTopicBlogsQuery.error.message === 'Network Error'  

                        ? <p className='error'>Somthing went wrong</p> 

                        : <p className='error'>{getTopicBlogsQuery.error?.response?.data?.error}</p>
                        
                    )

                :   null
            }
        </div>
    );
};

export default TopicBlogs; 