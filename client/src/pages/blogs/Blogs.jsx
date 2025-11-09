import { IonIcon } from '@ionic/react';
import { trendingUpOutline } from 'ionicons/icons';

import useBlogs from './context/useBlogs';

import { Nav, LocalNav, LatestBlogs, TrendingBlogs, Topics } from './components';

const Blogs = () => {
    const { blogsToShow } = useBlogs();

    return (
        <>
            <Nav />

            <main>

                <div className='ctn grid xl:grid-cols-3 gap-x-10'>

                    <div className='flex flex-col gap-y-8 col-span-2'>

                        <LocalNav />

                        {
                            blogsToShow === 'latest' ? <LatestBlogs /> : <TrendingBlogs />
                        }

                    </div>

                    <div className='border-l border-gray-100 pl-4 max-xl:hidden flex flex-col gap-y-8'>

                        <h1 className='text-2xl'>Stories from all interests</h1>

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