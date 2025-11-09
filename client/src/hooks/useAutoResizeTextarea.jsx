import { useEffect } from 'react';

const useAutoResizeTextarea = (textareaRef, dependency) => {
    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, [dependency]);
};

export default useAutoResizeTextarea;