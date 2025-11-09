import { useRef } from 'react';

import { useAutoResizeTextarea } from '@/hooks';
import useWrite from '../context/useWrite';

const BlogDescription = () => {
    const textareaRef = useRef(null);

    const { blogDescription, blogDescriptionError, handleFieldChange, handleFieldKeyDown } = useWrite();

    useAutoResizeTextarea(textareaRef, blogDescription);

    return (
        <div className='lg:w-[900px] lg:mx-auto flex flex-col gap-y-2'>

            <textarea 
                ref={textareaRef} 
                className='sm:text-xl text-gray-600 placeholder:text-gray-400' 
                value={blogDescription} 
                onChange={(e) => handleFieldChange(e, 'blogDescription')} 
                onKeyDown={(e) => handleFieldKeyDown(e)}
                maxLength={200}
                placeholder='Short description about your blog' 
            />

            {blogDescriptionError && <p className='error'>{blogDescriptionError}</p>}

            <p className='text-gray-400 text-xs sm:text-sm text-right'>{200 - blogDescription.length} / 200 characters left</p>

        </div>

    );
};

export default BlogDescription;