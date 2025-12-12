import { IonIcon } from '@ionic/react';
import { trendingUpOutline } from 'ionicons/icons';

import useBlogs from './context/useBlogs';

import { capitalize } from '@/helpers'

import { Nav, LocalNav } from '@/components';
import { LatestBlogs, TrendingBlogs, Topics, TopicBlogs } from './components';

const Blogs = () => {
    const { show, setShow, topic } = useBlogs();

    return (
        <>
            <Nav />

            <main className='h-screen-minus-header'>

                <div className='h-fit container p-4 mx-auto grid xl:grid-cols-3 gap-x-10 xl:divide-x-1 divide-gray-100'>

                    <div className='h-full pr-8 flex flex-col gap-y-8 col-span-2'>

                        <LocalNav 
                            show={show}
                            setShow={setShow}
                            firstTab={{
                                label: topic ? capitalize(topic): 'Latest Blogs',
                                identifier: topic ? topic : 'latest',
                            }} 

                            secondTab={{
                                label: 'Trending Blogs',
                                identifier: 'trending',
                            }}
                        />

                        {
                            show === 'latest' 
                            
                            ?   <LatestBlogs /> 
                            
                            :   show === 'trending'

                            ?   <TrendingBlogs />

                            :   <TopicBlogs />
                        }

                    </div>

                    <div className='max-xl:hidden flex flex-col gap-y-8'>

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