import { useState, useEffect, useRef} from 'react';

import { capitalize } from '../../../helpers';

import useBlogs from '../context/useBlogs';
import { useWindowWidth } from '../../../hooks';

const LocalNav = () => {
    const localNavMainTabRef = useRef(null);
    const [activeIndicatorStyles, setActiveIndicatorStyle] = useState({ width: 87.73, left: 0 });
    const { localNavMainTab, setBlogsToShow } = useBlogs();

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
            if (localNavMainTab === 'home') {
                setBlogsToShow('latest');
            } else {
                setBlogsToShow('topic');
            }
            setActiveIndicatorStyle({ width: localNavMainTabRef?.current?.offsetWidth, left: 0 });
        }
    }, [localNavMainTab, windowWidth]);


    return (
        <div className='pb-2 border-b border-gray-100 flex items-center gap-x-4 relative'>

            <button ref={localNavMainTabRef} className='text-base sm:text-xl px-4' type='button' onClick={(e) => handleSetActiveIndicatorStyle(e, 'latest')}>{capitalize(localNavMainTab)}</button>

            <button className='text-base sm:text-xl px-4 xl:hidden' type='button' onClick={(e) => handleSetActiveIndicatorStyle(e, 'trending')}>Trending Blogs</button>

            <span className='bg-black h-[1px] absolute bottom-0 transition-all duration-300 ease-in-out' style={activeIndicatorStyles}></span>

        </div>
    );
};

export default LocalNav;