import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

import useAuth from '@/contexts/auth/useAuth';

import { uploadImageByFile, uploadBlog } from '../apis/blog';

import WriteContext from './WriteContext';

const WriteProvider = ({ children }) => {
    const { token } = useAuth();

    const [blogCover, setBlogCover] = useState(null);
    const [blogCoverError, setBlogCoverError] = useState('');

    const [blogTitle, setBlogTitle] = useState('');
    const [blogTitleError, setBlogTitleError] = useState('');

    const [blogDescription, setBlogDescription] = useState('');
    const [blogDescriptionError, setBlogDescriptionError] = useState('');

    const [topic, setTopic] = useState('');

    const [blogTopics, setBlogTopics] = useState([]);
    const [blogTopicsError, setBlogTopicsError] = useState('');

    const [editorData, setEditorData] = useState(null);
    const [editorDataError, setEditorDataError] = useState('');

    const uploadImageByFileMutation = useMutation({ mutationFn: uploadImageByFile });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        uploadImageByFileMutation.mutate({ formData, token });
    };

    useEffect(() => {
        let loadingToast;

        if (uploadImageByFileMutation.isPending) {
            loadingToast = toast.loading('Uploading cover...');
        }

        if (uploadImageByFileMutation.isSuccess) {
            setBlogCover(uploadImageByFileMutation.data.data.file.url);
            toast.dismiss(loadingToast);
            toast.success('Cover uploaded successfully');
            if (blogCoverError) setBlogCoverError('');
        }

        if (uploadImageByFileMutation.isError) {
            toast.dismiss(loadingToast);
            if (uploadImageByFileMutation.error.message === 'Network Error') {
                toast.error('Internal servr error');
            } else {
                toast.error(uploadImageByFileMutation?.error?.response?.data?.error);
            }
        }
    }, [uploadImageByFileMutation.isPending, uploadImageByFileMutation.isSuccess, uploadImageByFileMutation.isError]);
       

    // For Title and Description Fields
    const handleFieldKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    // For Title and Description Fields
    const handleFieldChange = (e, field) => {
        const value = e.target.value;
        if (value.startsWith(' ') || value.endsWith('  ') || value.length > (field === 'blogTitle' ? 100 : 200)) return;

        if (field === 'blogTitle') {
            if (blogTitleError) setBlogTitleError('');
            setBlogTitle(e.target.value);
        } else {
            if (blogDescriptionError) setBlogDescriptionError('');
            setBlogDescription(e.target.value);
        };
    };


    const handleTopicKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTopic(topic);
        }
    };

    const handleTopicChange = (e) => {
        const value = e.target.value;
        if (value.startsWith(' ') || value.endsWith('  ')) return;
        setTopic(e.target.value);
    };

    const handleAddTopic = () => {
        if (blogTopics.length >= 10) return;

        const topicFormatted = topic.toLowerCase().trim();
        if (topicFormatted) {
            if (!blogTopics.includes(topicFormatted)) {
                if (blogTopicsError) setBlogTopicsError('');
                setBlogTopics([...blogTopics, topicFormatted]);
            } 
            setTopic('');
        }
    };

    const handleRemoveTopic = (index) => {
        const blogTopicsFiltered = blogTopics.filter((_, i) => i !== index);
        setBlogTopics(blogTopicsFiltered);
    };

    const handleChangeEditorData = (data) => {
        setEditorDataError('');
        setEditorData(data);
    };  

    const uploadBlogMutation = useMutation({ mutationFn: uploadBlog });

    const handlePublish = () => {
        if (!blogCover) {
            setBlogCoverError('Blog cover is required');
        }

        if (!blogTitle) {
            setBlogTitleError('Blog title is required');
        } else if (blogTitle.length > 100) {
            setBlogTitleError('Blog title must be less than or equal to 100 characters');
        }

        if (!blogDescription) {
            setBlogDescriptionError('Blog description is required');
        } else if (blogDescription.length > 200) {
            setBlogDescriptionError('Blog description must be less than or equal to 200 characters');
        }

        if (blogTopics.length === 0) {
            setBlogTopicsError('Blog topics are required');
        } else if (blogTopics.length > 10) {
            setBlogTopicsError('Blog topics must be less than or equal to 10');
        }

        if (!editorData || editorData?.blocks.length === 0) {
            setEditorDataError('Blog content is required');
        }

        if (!blogCover ||  !blogTitle ||  blogTitle.length > 100 || !blogDescription || blogDescription.length > 200 || blogTopics.length === 0 || blogTopics.length > 10 || !editorData || editorData?.blocks.length === 0) {
            return;
        }

        const blogData = {
            cover: blogCover,
            title: blogTitle,
            description: blogDescription,
            content: editorData,
            topics: blogTopics,
            isDraft: false,
        };

        uploadBlogMutation.mutate({ blogData, token });
    }

    const handleSaveDraft = () => {
        if (!blogTitle) {
            setBlogTitleError('Blog title is required');
        } else if (blogTitle.length > 100) {
            setBlogTitleError('Blog title must be less than or equal 100 characters');
        }

        if (blogDescription.length > 200) {
            setBlogDescriptionError('Blog description must be less than or equal to 200 characters');
        }

        const blogData = {
            cover: blogCover,
            title: blogTitle,
            description: blogDescription,
            content: editorData,
            topics: blogTopics,
            isDraft: true,
        };

        uploadBlogMutation.mutate({ blogData, token });
    };

    const handleReset = () => {
        setBlogCover(null);
        setBlogCoverError('');
        setBlogTitle('');
        setBlogTitleError('');
        setBlogDescription('');
        setBlogDescriptionError('');
        setTopic('');
        setBlogTopics([]);
        setBlogTopicsError('');
        setEditorData(null);
        setEditorDataError('');
    };

    const navigate = useNavigate('');

    useEffect(() => {
        let loadingToast;

        if (uploadBlogMutation.isPending) {
            loadingToast = toast.loading('Uploading blog...');
        }

        if (uploadBlogMutation.isSuccess) {
            handleReset();
            toast.dismiss(loadingToast);
            toast.success('Blog uploaded successfully');
            navigate('/dashboard/blogs');
        }

        if (uploadBlogMutation.isError) {
            toast.dismiss(loadingToast);
            if (uploadBlogMutation.error.message === 'Network Error') {
                toast("Internal server error");
            } else {
                toast(uploadBlogMutation.error?.response?.data?.error);
            }
        }
    }, [uploadBlogMutation.isPending, uploadBlogMutation.isSuccess, uploadBlogMutation.isError]);

    const value = {
        blogCover,
        blogCoverError,
        handleFileChange,
        blogTitle,
        blogTitleError,
        blogDescription,
        blogDescriptionError,
        handleFieldChange,
        handleFieldKeyDown,
        topic, 
        blogTopics,
        blogTopicsError,
        handleTopicChange,
        handleTopicKeyDown,
        handleRemoveTopic,
        setEditorData,
        handleChangeEditorData,
        editorDataError,
        setEditorDataError,
        handlePublish,
        handleSaveDraft
    };

    return (
        <WriteContext.Provider value={value}>
            {children}
        </WriteContext.Provider>
    );
};

export default WriteProvider;