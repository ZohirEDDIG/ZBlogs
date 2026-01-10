import useBlog from './context/useBlog';

import { Nav, Loading, NoDataFound, } from '@/components';
import { BlogComponent } from './components';

const Blog = () => {
    const { getBlogQuery } = useBlog();

    return (
        <>

            <Nav />

            <main className='h-screen-minus-header'>

                <div className='h-fit container p-4 mx-auto'>

                    {
                        getBlogQuery.isPending 

                        ?   <Loading loadingMessage='Fetching Blog' />

                        :   getBlogQuery.isSuccess 

                        ?   <BlogComponent blog={getBlogQuery.data.data.blog} />
                                    
                        :   getBlogQuery.isError

                        ?   (
                                getBlogQuery.error.response.status === 404

                                ?   <NoDataFound  noDataFoundMessage='Blog Not Found' />

                                :   <p className='error'>Something went wrong while fetching blog. Please refresh the page or try again later</p> 
                            )

                        :   null
                        
                    }
                
                </div>

            </main>

        </>
    );
};

export default Blog;