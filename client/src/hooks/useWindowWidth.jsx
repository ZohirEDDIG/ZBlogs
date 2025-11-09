import { useState, useEffect } from 'react';

const useWindowWidth = () => {
    const [winddowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return winddowWidth;
};

export default useWindowWidth;