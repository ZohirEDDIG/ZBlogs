import { personOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

import useSearch from './context/useSearch';

import { Nav, LocalNav } from '@/components';
import { Blogs, Users } from './components';

const Search = () => {
    const { query, show, setShow } = useSearch();

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
                                identifier: 'blogs',
                                label: `Search results for '${query}'`
                            }}
                            secondTab={{ 
                                identifier: 'users',
                                label: 'Users related to search'
                            }}
                        />

                        {
                            show === 'blogs' 
                            
                            ?   <Blogs /> 
                            
                            :   <Users />
                        }

                    </div>

                    <div className='max-xl:hidden flex flex-col gap-y-8'>

                        <h1 className='text-xl flex items-center gap-x-2'>
                            
                            Users related to search
                            
                            <IonIcon className='text-xl' icon={personOutline} />

                        </h1>

                        <Users />

                    </div>

                </div>

            </main>

        </>
    );
};

export default Search;