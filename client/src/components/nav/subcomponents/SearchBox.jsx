import useSearch  from '@/pages/search/context/useSearch';

import { IonIcon } from '@ionic/react';
import { search } from 'ionicons/icons';

const SearchBox = () => {
    const { query, handleQueryKeyDown, handleQueryChange, handleQueryClick } = useSearch();

    return (
        <div className='w-[160px] sm:w-[200px] lg:w-[300px] text-sm border-1 border-gray-200 bg-gray-100 px-2 py-2 sm:px-4 sm:py-2 rounded-full flex justify-between transition-all duration-300 ease-in-out  focus-within:border-violet-300'>

            <input 
                className='max-w-[90%] group' 
                type='search' 
                name='search' 
                placeholder='Search here...' 
                value={query}
                onKeyDown={handleQueryKeyDown}
                onChange={(e) => handleQueryChange(e)}
            />

            <button 
                className='text-gray-400 flex justify-center items-center' 
                type='button'
                onClick={handleQueryClick}
            >

                <IonIcon icon={search} />

            </button>

        </div>
    );
};

export default SearchBox;