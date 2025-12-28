import useUser from './context/useUser';

import { Nav, LocalNav, Loading, NoDataFound } from '@/components';
import { BlogsPublished, Profile } from './components';

const User = () => {
    const { username, getUserByUsernameQuery, show, setShow } = useUser();

    return (
        <>

            <Nav />

            <main>

                <div className='container p-4 mx-auto'>

                    {
                        getUserByUsernameQuery.isPending 

                        ?   <Loading loadingMessage={`Fetching user '${username}'`} />

                        :   getUserByUsernameQuery.isSuccess 

                        ?   <>
                                 
                                <div className='h-fit container p-4 mx-auto grid xl:grid-cols-3 gap-x-10 xl:divide-x-1 divide-gray-100'>

                                    <div className='h-full pr-8 flex flex-col gap-y-8 col-span-2'>

                                        <LocalNav 
                                            show={show}
                                            setShow={setShow}
                                            firstTab={{
                                                label: 'Blogs Published',
                                                identifier: 'blogs',
                                            }} 

                                            secondTab={{
                                                label: 'About',
                                                identifier: 'about',
                                            }}
                                        />

                                        {
                                            show === 'blogs' 
                                            
                                            ?   <BlogsPublished /> 
                                            
                                            :   <Profile user={getUserByUsernameQuery.data.data.user} />
                                        }

                                    </div>

                                    <div className='max-xl:hidden'>

                                        <Profile user={getUserByUsernameQuery.data.data.user} />

                                    </div>


                                </div>   

                            </>

                        :   getUserByUsernameQuery.isError

                        ?   (  getUserByUsernameQuery.error?.status === 404 
                            
                                ?  <NoDataFound noDataFoundMessage='No user Found' />
                                
                                :  <p className='error'>Something went wrong while fetching user  '{username}'. Please refresh the page or try again later</p> 
                            )

                        :   null
                    }
            
                </div>

            </main>

        </>
    );
};

export default User;