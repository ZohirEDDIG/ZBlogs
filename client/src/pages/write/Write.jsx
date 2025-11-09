import { Nav, BlogCover, BlogTitle, Editor, BlogDescription, BlogTopics } from './components';

const Write = () => {
    return (
        <>
            <Nav />

            <main>

                <div className='ctn flex flex-col gap-y-12'>

                    <BlogCover />

                    <BlogTitle />

                    <BlogDescription />

                    <BlogTopics />

                    <hr className='border-gray-300 lg:w-[900px] lg:mx-auto' />

                    <Editor />

                </div>
            
            </main>

        </>
    );
};

export default Write;