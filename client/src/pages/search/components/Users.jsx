import useSearch from '../context/useSearch';

import { Loading, NoDataFound } from '@/components';

import UserCard from './UserCard';

const Users = () => {
    const { query, getSearchUsersQuery } = useSearch();

    return (
        <div className='h-full flex flex-col gap-y-10'>
            {
                getSearchUsersQuery.isPending 

                ?   <Loading loadingMessage={`Fetching users related to '${query}'`} />

                :   getSearchUsersQuery.isSuccess 

                ?   
                    (
                        getSearchUsersQuery.data.data.users.length == 0

                        ?   <NoDataFound noDataFoundMessage='No users Found' />

                        :   <>
                            
                                {
                                    getSearchUsersQuery.data.data.users.map((user) => (

                                        <UserCard key={user.id} user={user} />

                                    ))
                                }

                            </>
                    )

                :   getSearchUsersQuery.isError

                ?   <p className='error'>Something went wrong while fetching users related to '{query}'. Please refresh the page or try again later</p> 

                :   null
            }
        </div>
    );
};

export default Users;