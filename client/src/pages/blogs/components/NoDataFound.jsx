const NoDataFound = ({ noDataFoundMessage }) => {
    return (
        <div className="bg-gray-100 w-full text-center py-3 rounded-full">

            <p className='text-gray-500'>{noDataFoundMessage}</p>

        </div>
    );
};

export default NoDataFound;