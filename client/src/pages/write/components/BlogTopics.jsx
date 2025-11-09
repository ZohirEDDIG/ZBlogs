import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';

import useWrite from '../context/useWrite';

const BlogTopics = () => {
    const { topic, blogTopics, blogTopicsError, handleTopicChange, handleTopicKeyDown, handleRemoveTopic } = useWrite();

    return (
        <div className='lg:w-[900px] lg:mx-auto flex flex-col gap-y-2'>

            <label className='text-gray-400 text-sm sm:text-xl' htmlFor='topic'>Topics - (Help searching and ranking your blog post)</label>

            <div className='bg-gray-100 p-4 border border-gray-200 rounded-md flex flex-col gap-y-4 transition-colors duration-300 ease-in-out focus-within:border-violet-300'>

                <input 
                    className='bg-white text-gray-600 p-2 rounded-md placeholder:text-gray-400' 
                    type='text' 
                    name='topic' 
                    id='topic' 
                    value={topic}
                    onChange={(e) => handleTopicChange(e)}
                    onKeyDown={(e) => (handleTopicKeyDown(e))}
                    placeholder='Topic' 
                    disabled={blogTopics.length >= 10}
                />

                {
                    blogTopics.length > 0 && <div className='flex flex-wrap items-center gap-2'>

                        {

                            blogTopics.map((topic, index) => (

                                <span key={index} className='bg-white text-xs sm:text-sm py-1.5 px-3 rounded-full flex items-center gap-x-2'>

                                    <span>{topic}</span>

                                    <button className='text-xl flex' aria-label type='button' onClick={() => handleRemoveTopic(index)}>

                                        <IonIcon icon={closeOutline} />

                                    </button>

                                </span>
                            ))

                        }

                    </div>
                }

            </div>

            {blogTopicsError && <p className='error'>{blogTopicsError}</p>}

            <p className='text-gray-400 text-xs sm:text-sm text-right'>{10 - blogTopics.length} / 10 topics left</p>

        </div>

    );
};

export default BlogTopics;