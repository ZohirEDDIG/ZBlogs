import { IonIcon } from '@ionic/react';
import { chevronForwardOutline, chevronBackOutline } from 'ionicons/icons';

const Pagination = () => {
    return (
        <div className='my-4 flex justify-center sm:justify-between'>

            <div className='max-sm:hidden' />

            <button className='bg-gray-100 text-gray-500 px-4 py-2 rounded-xl hidden sm:flex items-center gap-x-2 transition-opacity duration-300 ease-in-out hover:opacity-80' type='button'>

                Next Page 

                <IonIcon icon={chevronForwardOutline} />

            </button>

            <div className='flex items-center gap-x-2 sm:gap-x-4'>

                <button className='bg-gray-100 text-gray-500 px-4 py-2 rounded-xl flex transition-opacity duration-300 ease-in-out hover:opacity-80'  type='button'>

                    <IonIcon icon={chevronBackOutline} />

                </button>

                <span className='text-gray-500'>1</span>

                <button className='bg-gray-100 text-gray-500 px-4 py-2 rounded-xl flex transition-opacity duration-300 ease-in-out hover:opacity-80' type='button'>

                    <IonIcon icon={chevronForwardOutline} />

                </button>

                <span  className='text-gray-500'>|</span>

                <span  className='text-gray-500'>121</span>

            </div>

        </div>
    );
};

export default Pagination;