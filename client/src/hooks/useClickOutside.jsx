import { useEffect } from 'react';

const useClickOutside = (containerRef,  buttonRef, setterFunction) => {
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && buttonRef.current && !containerRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
                setterFunction(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);

    }, [containerRef, buttonRef, setterFunction]);
};

export default useClickOutside;