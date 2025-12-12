import useBlogs from '../context/useBlogs';


import { Loading, NoDataFound } from '@/components';
import { TrendingBlogCard } from './';

const TrendingBlogs = () => {
    const { getTrendingBlogsQuery } = useBlogs();

    return (
        <div className='h-full pb-6 flex flex-col gap-y-10'>
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

                ?   <p className='error'>Something went wrong while fetching trending blogs. Please refresh the page or try again later</p> 

                :   null
            }
        </div>
    );
};

export default TrendingBlogs;