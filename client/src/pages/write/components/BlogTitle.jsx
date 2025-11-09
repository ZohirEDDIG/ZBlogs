import { useRef } from 'react';

import { useAutoResizeTextarea } from '@/hooks';
import useWrite from '../context/useWrite';

const BlogTitle = () => {
    const textareaRef = useRef(null);

    const { blogTitle, blogTitleError, handleFieldChange, handleFieldKeyDown } = useWrite();

    useAutoResizeTextarea(textareaRef, blogTitle);

    return (
        <div className='lg:w-[900px] lg:mx-auto  flex flex-col gap-y-2'>

            <textarea 
                ref={textareaRef} 
                className='sm:text-xl text-gray-600 placeholder:text-gray-400' 
                value={blogTitle} 
                onChange={(e) => handleFieldChange(e, 'blogTitle')} 
                onKeyDown={(e) => handleFieldKeyDown(e)}
                maxLength={100}
                placeholder='Blog Title' 
            />

            {blogTitleError && <p className='error'>{blogTitleError}</p>}

            <p className='text-gray-400 text-xs sm:text-sm text-right'>{100 - blogTitle.length} / 100 characters left</p>

        </div>

    );
};

export default BlogTitle;