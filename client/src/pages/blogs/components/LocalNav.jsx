import { useState, useEffect } from 'react';

import useBlogs from '../context/useBlogs';
import { useWindowWidth } from '../../../hooks';

const LocalNav = () => {
    const [activeIndicatorStyles, setActiveIndicatorStyle] = useState({ width: 87.73, left: 0 });
    const { setBlogsToShow } = useBlogs();

    const handleSetActiveIndicatorStyle = (e, blogsToShow) => {
        setBlogsToShow(blogsToShow);
        setActiveIndicatorStyle({
            width: e.target.offsetWidth,
            left: e.target.offsetLeft
        })
    };

    const windowWidth = useWindowWidth();
    useEffect(() => {
        if (windowWidth >= 1280) {
            setBlogsToShow('latest');
            setActiveIndicatorStyle({ width: 87.73, left: 0 });
        }
    }, [windowWidth]);

    return (
        <div className='pb-2 border-b border-gray-100 flex items-center gap-x-4 relative'>

            <button className='text-xl px-4' type='button' onClick={(e) => handleSetActiveIndicatorStyle(e, 'latest')}>Home</button>

            <button className='text-xl px-4 xl:hidden ' type='button' onClick={(e) => handleSetActiveIndicatorStyle(e, 'trending')}>Trending Blogs</button>

            <span className='bg-black h-[1px] absolute bottom-0 transition-all duration-300 ease-in-out' style={activeIndicatorStyles}></span>

        </div>
    );
};

export default LocalNav;