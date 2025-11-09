import { IonIcon } from '@ionic/react';
import { search } from 'ionicons/icons';

const SearchBox = () => {
    return (
        <div className='max-w-[200px] border-1 border-gray-200 bg-gray-100 px-4 py-1.5 rounded-full flex justify-between transition-all duration-300 ease-in-out  focus-within:border-violet-300'>

            <input className='max-w-[90%] group' type='search' name='search' placeholder='Search here...' />

            <button className='text-gray-400 flex justify-center items-center' type='button'>

                <IonIcon icon={search} />

            </button>

        </div>
    );
};

export default SearchBox;