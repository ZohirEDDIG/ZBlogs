import { capitalize } from '@/helpers';

import useBlogs from '../context/useBlogs';
import Loading from './Loading';

const Topics = () => {
    const { topic, handleSetTopic, getTopicsQuery } = useBlogs();

    return (
        <div className='flex flex-wrap gap-2'>
            {
                getTopicsQuery.isPending 

                ?   <Loading loadingMessage='Fetching Topics' />

                :   getTopicsQuery.isSuccess 

                ?    

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

                :   getTopicsQuery.isError

                ?   (
                    
                        getTopicsQuery.error.message === 'Network Error'  

                        ? <p className='error'>Somthing went wrong</p> 

                        : <p className='error'>{getTopicsQuery.error?.response?.data?.error}</p>
                        
                    )

                :   null
            }
        </div>
    );
};

export default Topics;