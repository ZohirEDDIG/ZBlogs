import useBlogs from '../context/useBlogs';

import Loading  from './Loading';
import NoDataFound from './NoDataFound';
import TrendingBlogCard from './TrendingBlogCard';

const TrendingBlogs = () => {
    const { getTrendingBlogsQuery } = useBlogs();

    return (
        <div className='h-full flex flex-col gap-y-10'>
            {
                getTrendingBlogsQuery.isPending 

                ?   <Loading loadingMessage='Fetching Trending Blogs' />

                :   getTrendingBlogsQuery.isSuccess 

                ?   (

                    getTrendingBlogsQuery.data.data.blogs.length === 0

                    ?   <NoDataFound noDataFoundMessage='No Blogs Found' />

                    :   (
                            getTrendingBlogsQuery.data.data.blogs.map((blog, index) => (

                                <TrendingBlogCard key={blog.blogId} number={index + 1} blog={blog} />
                            ))
                     )
                    )

                :   getTrendingBlogsQuery.isError

                ?   (
                    
                        getTrendingBlogsQuery.error.message === 'Network Error'  

                        ? <p className='error'>Somthing went wrong</p> 

                        : <p className='error'>{getTrendingBlogsQuery.error?.response?.data?.error}</p>
                        
                    )

                :   null
            }
        </div>
    );
};

export default TrendingBlogs;