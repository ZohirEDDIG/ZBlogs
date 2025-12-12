import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import SearchContext from './SearchContext';

import { getSearchUsers, getSearchBlogs } from '../apis'

const SearchProvider = ({ children }) => {
    const { query: urlQuery } = useParams();
    const [query, setQuery] = useState(urlQuery  || '');
    const [show, setShow] = useState('blogs');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getSearchBlogsQuery = useQuery({
        queryKey: ['search-blogs', query, currentPage],
        queryFn: () => getSearchBlogs({ query, currentPage }),
        enabled: !!query
    });

    const getSearchUsersQuery = useQuery({
        queryKey: ['search-users', query],
        queryFn: () => getSearchUsers(query),
        enabled: !!query
    });

    useEffect(() => {
        if (getSearchBlogsQuery.isSuccess) {
            setTotalPages(getSearchBlogsQuery.data.data.totalPages);
        }
    }, [getSearchBlogsQuery.isSuccess]);

    const handleNextPage = () => {
        if (currentPage === totalPages) return;
        setCurrentPage((prev) => prev + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage === 1) return;
        setCurrentPage((prev) => prev - 1);
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (urlQuery !== query) {
            setQuery(urlQuery || '');
        }
    }, [urlQuery]);

    const handleQueryKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleQueryClick();
        }
    };

    const handleQueryChange = (e) => {
        const q = e.target.value;
        if (q.startsWith(' ') || q.endsWith('  ')) return;
        setQuery(q.toLowerCase());
    };

    const handleQueryClick = () => {
        if (query.trim()) {
            navigate(`/search/${query}`);
        }
    };

    const value = {
        query,
        handleQueryKeyDown,
        handleQueryChange,
        handleQueryClick,
        show,
        setShow,
        getSearchBlogsQuery,
        getSearchUsersQuery,
        currentPage,
        handleNextPage,
        handlePreviousPage,
        totalPages
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;