import useBlogs from '../context/useBlogs';

const Topics = () => {
    const { getTopicsQuery } = useBlogs();

    return (
        <div className='flex flex-wrap gap-2'>
            {
                getTopicsQuery.isPending 

                ?   <p>Fetching Topics...</p>

                :   getTopicsQuery.isSuccess 

                ?    

                    getTopicsQuery.data.data.topics.map((topic, index) => (

                        <span key={index} className='bg-gray-100 px-4 py-2 rounded-full'>{topic}</span>

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