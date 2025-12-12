const Loading = ({ loadingMessage }) => {
    return (
        <div className="w-full flex flex-col items-center gap-y-2">

            <div className='w-10 h-10 border-gray-300 border-r-transparent border-2  border-dashed rounded-full animate-spin' />

            <p className='text-gray-500 animate-pulse'>{loadingMessage}...</p>

        </div>
    );
};

export default Loading;