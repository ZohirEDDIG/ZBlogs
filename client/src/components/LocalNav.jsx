import { useState, useEffect, useRef} from 'react';

import { useWindowWidth } from '@/hooks';

const LocalNav = ({ show, setShow, firstTab, secondTab }) => {
    const firstTabRef = useRef(null);
    const secondTabRef = useRef(null);
    const [activeIndicatorStyles, setActiveIndicatorStyle] = useState({ width: 0, left: 0 });

    // Set initial indicator width
    useEffect(() => {
        setActiveIndicatorStyle((prev) => ({ ...prev, width: firstTabRef.current.offsetWidth }));
    }, []);

    const handleSetActiveIndicatorStyle = (e, s) => {
        setShow(s);
        setActiveIndicatorStyle({
            width: e.target.offsetWidth,
            left: e.target.offsetLeft
        });
    };

    const windowWidth = useWindowWidth();

    // Switch back to first tab when screen width > 1280
    useEffect(() => {
        if (windowWidth >= 1280) {
            if (show !== firstTab.identifier) {
                setShow(firstTab.identifier);
                setActiveIndicatorStyle({ width: firstTabRef.current.offsetWidth, left:  0 });
            }
        }
    }, [windowWidth]);


    useEffect(() => {
        setActiveIndicatorStyle({
            width: firstTabRef.current.offsetWidth,
            left: 0
        })
    }, [windowWidth, firstTab.label]);

    return (
        <div className='pb-2 border-b border-gray-100 flex items-center gap-x-4 relative'>

            <button 
                className='text-base sm:text-xl px-4 line-clamp-1' 
                ref={firstTabRef} 
                type='button' 
                onClick={(e) => handleSetActiveIndicatorStyle(e, firstTab.identifier)}
            >
                
                {firstTab.label}
            
            </button>

            <button 
                className='text-base sm:text-xl line-clamp-1 px-4 xl:hidden'
                ref={secondTabRef}
                type='button' 
                onClick={(e) => handleSetActiveIndicatorStyle(e, secondTab.identifier)}
            >

                {secondTab.label}
            
            </button>

            <span 
                className='bg-black h-[1px] absolute bottom-0 transition-all duration-300 ease-in-out' 
                style={activeIndicatorStyles}
            />

        </div>
    );
};

export default LocalNav;