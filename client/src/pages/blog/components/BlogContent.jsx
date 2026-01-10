import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

const BlogContent = ({ blogContent }) => {
    return (
        <div className='flex flex-col gap-y-4'>

            {
                blogContent.blocks.map((pc) => {
                    if (pc.type === 'paragraph') return <RenderParagraph key={pc.id} text={pc.data.text} />
                    else if (pc.type === 'heading') return <RenderTitle key={pc.id} level={pc.data.level} text={pc.data.text} />
                    else if (pc.type === 'image') return <RenderImage key={pc.id} src={pc.data.file.url} alt={pc.data.caption}  />
                    else if (pc.type === 'quote') return <RenderQuote key={pc.id}  text={pc.data.text} caption={pc.data.caption} />        
                    else if (pc.type === 'list' && pc.data.style === 'ordered')  return <RenderOrderedList items={pc.data.items}  /> 
                    else if (pc.type === 'list' && pc.data.style === 'unordered')  return <RenderUnorderedList items={pc.data.items}  /> 
                    else if (pc.type === 'code')  return <RenderCode code={pc.data.code}  /> 
                    else if (pc.type === 'table')  return <RenderTable content={pc.data.content}  /> 
                    else if (pc.type === 'link')  return <RenderLink href={pc.data.link}  /> 
                })
            }

        </div>
    );
};

export default BlogContent;

const RenderParagraph = ({ text }) => {
    return <p dangerouslySetInnerHTML={{ __html: text }} className='text-base font-normal' />;
};

const RenderTitle = ({ level, text }) => {
    if (level === 1) return <h1 className='text-[32px] font-bold'>{text}</h1>;
    if (level === 2) return <h2 className='text-2xl font-bold'>{text}</h2>;
    if (level === 3) return <h3 className='text-[18px] font-bold'>{text}</h3>;
    if (level === 4) return <h4 className='text-base font-bold'>{text}</h4>;
    if (level === 5) return <h5 className='text-[12px] font-bold'>{text}</h5>;
    if (level === 6) return <h6 className='text-[10px] font-bold'>{text}</h6>;
};

const RenderImage = ({ src, alt }) => {
    return (
        <div className='max-w-[500px] flex flex-col items-center gap-y-2'>

            <img src={src} alt={alt || 'Image in blog'} className="max-w-[500px]" />

            { alt && <caption className='text-gray-400 italic '>{alt}</caption> }

        </div>
    );
};

const RenderQuote = ({ text, caption }) => {
    return (
        <div className='bg-gray-200 p-6 border-l-3 border-violet-400 flex flex-col items-start gap-y-3'> 

            <blockquote><span className='italic'>"</span>{text}<span className='italic'>"</span></blockquote>

            <caption className='text-gray-400 italic '>{caption || 'Unknown'}</caption> 

        </div>
    );
};

const RenderOrderedList = ({ items }) => {
    return (
        <ol className='list-decimal list-inside pl-4'>

            {

                items.map((item, index) => (

                    <li key={index}>{item.content}</li>

                ))

            }

        </ol>
    );
};

const RenderUnorderedList = ({ items }) => {
    return (
        <ul className='list-disc list-inside pl-4'>

            {

                items.map((item, index) => (

                    <li key={index}>{item.content}</li>

                ))

            }

        </ul>
    );
};

const RenderCode = ({ code }) => {
    return (
        <SyntaxHighlighter language="java" style={oneDark}>

            {code}

        </SyntaxHighlighter>
    );
};

const RenderTable = ({ content }) => {
    const header = content[0];
    const body = content.slice(1);


    return (
        <table className="border-1">

            <thead className="border-1">

                <tr>

                    {header.map((item, index) => (

                        <th key={index} className="border-1 p-1 text-left">

                            {item}

                        </th>
                    ))}

                </tr>

            </thead>

            <tbody >

                {body.map((row, rowIndex) => (

                    <tr key={rowIndex}>

                        {row.map((cell, cellIndex) => (

                            <td key={cellIndex} className="border-1 p-1">{cell}</td>

                        ))}

                    </tr>

                ))}

            </tbody>
        </table>
    );
};

const RenderLink =  ({ href }) => {
    return (
        <a href={href} className="underline text-blue-500">{href}</a>
    );
};