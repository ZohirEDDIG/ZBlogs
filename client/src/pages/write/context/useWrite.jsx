import { useContext } from 'react';

import WriteContext from './WriteContext';

const useWrite = () => {
    const context = useContext(WriteContext);
    if (!context) {
        throw new Error('useWrite must be used within a WriteProvider');
    }
    return context;
};

export default useWrite;