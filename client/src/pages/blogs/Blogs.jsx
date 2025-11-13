import { IonIcon } from '@ionic/react';
import { trendingUpOutline } from 'ionicons/icons';

import useBlogs from './context/useBlogs';

import { Nav, LocalNav, LatestBlogs, TrendingBlogs, Topics, TopicBlogs } from './components';

const Blogs = () => {
    const { blogsToShow } = useBlogs();



    return (
        <>
            <Nav />

            <main className='h-screen-minus-header'>

                <div className='h-full ctn grid xl:grid-cols-3 gap-x-10'>

                    <div className='h-full flex flex-col gap-y-8 col-span-2'>

                        <LocalNav />

                        {
                            blogsToShow === 'latest' 
                            
                            ?   <LatestBlogs /> 
                            
                            :   blogsToShow === 'trending'

                            ?   <TrendingBlogs />

                            :   <TopicBlogs />
                        }

                    </div>

                    <div className='h-full border-l border-gray-100 pl-4 max-xl:hidden flex flex-col gap-y-8'>

                        <h1 className='text-2xl'>Stories from different topics</h1>

                        <div className='flex items-center gap-x-4'>

                            <h2 className='text-xl'>Trending</h2>

                            <IonIcon className='text-xl' icon={trendingUpOutline} />

                        </div>

                        <Topics />

                        <TrendingBlogs />

                    </div>

                </div>

            </main>

        </>
    );
};

export default Blogs;