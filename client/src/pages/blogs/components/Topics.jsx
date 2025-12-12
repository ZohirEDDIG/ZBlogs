import { capitalize } from '@/helpers';

import useBlogs from '../context/useBlogs';

import { Loading, NoDataFound } from '@/components';

const Topics = () => {
    const { topic, handleSetTopic, getTopicsQuery } = useBlogs();

    return (
        <div className='flex flex-wrap gap-2'>
            {
                getTopicsQuery.isPending 

                ?   <Loading loadingMessage='Fetching Topics' />

                :   getTopicsQuery.isSuccess 

                ?    
                (
                    getTopicsQuery.data.data.topics.length === 0

                    ?   <NoDataFound noDataFoundMessage='No Topics Found' />

                    :   (
                        getTopicsQuery.data.data.topics.map((t, i) => (

                            <button 
                                key={i}  
                                className={`${t === topic ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'} px-4 py-2 rounded-full`}
                                type='button'
                                onClick={() => handleSetTopic(t)}
                            >
                                {capitalize(t)}
                            </button>

                        ))
                    )
                )

                :   getTopicsQuery.isError

                ?   <p className='error'>Something went wrong while fetching topics. Please refresh the page or try again later</p> 

                :   null
            }
        </div>
    );
};

export default Topics;