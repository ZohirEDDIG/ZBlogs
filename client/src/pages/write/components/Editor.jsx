import { useEffect, useRef } from 'react';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import ImageTool from '@editorjs/image';
import List from '@editorjs/list';
import Table from '@editorjs/table';
import LinkTool from '@editorjs/link';
import Quote from '@editorjs/quote';
import Code from '@editorjs/code';
import InlineCode from '@editorjs/inline-code'
import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';
import Delimiter from '@editorjs/delimiter';

import useAuth from '@/contexts/auth/useAuth';
import useWrite from '../context/useWrite';

const API_URL = import.meta.env.VITE_API_URL;

const Editor = () => {
    const editorRef = useRef(null);
    const editorContainerRef = useRef(null);

    const { token } = useAuth();
    const { editorDataError, handleChangeEditorData } = useWrite ();

    useEffect(() => {
        if (!editorContainerRef.current) return;

        const editor = new EditorJS({
            holder: editorContainerRef.current,
            placeholder: 'Write your blog here...',
            tools: {
                heading: {
                    class: Header,
                    config: {
                        levels: [1, 2, 3, 4, 5, 6],
                        defaultLevel: 1,
                    },
                },
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                },
                image: {
                    class: ImageTool,
                    config: {
                        endpoints: {
                            byFile: `${API_URL}/blogs/upload-image-by-file`, 
                            byUrl: `${API_URL}/blogs/upload-image-by-url`,
                        },
                        additionalRequestHeaders: {
                            Authorization: `Bearer ${token}`
                        },
                    }
                },
                list: {
                    class: List,
                },
                table: {
                    class: Table,
                }, 
                link: {
                    class: LinkTool
                },
                embed: {
                    class: Embed,
                },
                quote: {
                    class: Quote,
                },
                code: {
                    class: Code,
                },
                InlineCode: {
                    class: InlineCode
                },
                marker: {
                    class: Marker,
                },
                delimiter: {
                    class: Delimiter,
                },
            },
            onChange: async () => {
                const data = await editor.save();
                handleChangeEditorData(data);
            },
        });

        editorRef.current = editor;

        return () => {
            if (editorRef.current && typeof editorRef.current.destroy === 'function') {
                editorRef.current.destroy();
            }
            editorRef.current = null;

        };
    }, []);

    return (
        <div className='lg:w-[900px] lg:mx-auto flex flex-col gap-y-2'>

            <div ref={editorContainerRef} />

            {editorDataError && <p className='error'>{editorDataError}</p>}

        </div>
    );
}

export default Editor;