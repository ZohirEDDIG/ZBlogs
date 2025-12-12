import { Loading, NoDataFound, Pagination } from '@/components';

import BlogCard from './BlogCard';

import useSearch from '../context/useSearch';

const Blogs = () => {
    const { query, getSearchBlogsQuery, currentPage, totalPages, handleNextPage , handlePreviousPage } = useSearch();

    return (
        <div className='h-full flex flex-col gap-y-10'>
            {
                getSearchBlogsQuery.isPending 

                ?   <Loading loadingMessage={`Fetching ${query} Blogs`} />

                :   getSearchBlogsQuery.isSuccess 

                ?   
                    (
                        getSearchBlogsQuery.data.data.blogs.length == 0

                        ?   <NoDataFound noDataFoundMessage='No Blogs Found' />

                        :   <>
                            
                                {
                                    getSearchBlogsQuery.data.data.blogs.map((blog) => (

                                        <BlogCard key={blog.blogId} blog={blog} />

                                    ))
                                }


                                <Pagination 
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    handleNextPage={handleNextPage}
                                    handlePreviousPage={handlePreviousPage} 
                                />
                            
                            </>
                    )

                :   getSearchBlogsQuery.isError

                ?   <p className='error'>Something went wrong while fetching '{query}' blogs. Please refresh the page or try again later</p> 

                :   null
            }
        </div>
    );
};

export default Blogs;