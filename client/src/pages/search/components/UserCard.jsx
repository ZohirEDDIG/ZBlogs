import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
    return (
        <Link 
            className='flex items-center gap-x-4'
            to={`users/${user.personalInfo.username}`}
        >

            <div>

                <img 
                    className='w-10 rounded-full'
                    src={user.personalInfo.profileImage} 
                    alt="" 

                />
            
            </div>

            <div className='flex flex-col'>

                <span>{user.personalInfo.fullName}</span>

                <span className='text-gray-400 text-sm'>@{user.personalInfo.username}</span>

            </div>

        </Link>
    );
};

export default UserCard;