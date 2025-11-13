import useBlogs from '../context/useBlogs';

import { Loading, LatestBlogCard, NoDataFound, Pagination} from './';

const LatestBlogs = () => {
    const { getLatestBlogsQuery } = useBlogs();

    return (
        <div className='h-full flex flex-col gap-y-10'>
            {
                getLatestBlogsQuery.isPending 

                ?   <Loading loadingMessage='Fetching Latest Blogs' />

                :   getLatestBlogsQuery.isSuccess 

                ?   
                    (
                        getLatestBlogsQuery.data.data.blogs.length === 0

                        ?   <NoDataFound noDataFoundMessage='No Blogs Found' />

                        :   <>
                            
                                {
                                    getLatestBlogsQuery.data.data.blogs.map((blog) => (

                                        <LatestBlogCard key={blog.blogId} blog={blog} />

                                    ))
                                }

                                <Pagination />
                            
                            </>
                    )

                :   getLatestBlogsQuery.isError

                ?   (
                    
                        getLatestBlogsQuery.error.message === 'Network Error'  

                        ? <p className='error'>Somthing went wrong</p> 

                        : <p className='error'>{getLatestBlogsQuery.error?.response?.data?.error}</p>
                        
                    )

                :   null
            }
        </div>
    );
};

export default LatestBlogs;