import useAuth from '@/contexts/auth/useAuth';


const Profile = ({ user }) => {
    const { user: currentUser } = useAuth();

    console.log(currentUser);

    return (
        <section>

            <div className='flex flex-col items-center gap-y-2'>

                <div>

                    <img 
                        className='w-15 rounded-full'
                        src={user.personalInfo.profileImage} 
                        alt={`${user.personalInfo.username} profile image`}

                    />
                
                </div>

                <span>{user.personalInfo.fullName}</span>

                <span className='text-gray-400 text-sm'>@{user.personalInfo.username}</span>

                <span className='text-gray-400 text-sm'>{user.accountInfo.totalPosts} Blogs - {user.accountInfo.totalReads} Reads</span>

                { (currentUser.personalInfo.username = user.personalInfo.username) && 
                
                    <Link to='/settings/edit-profile'>
                        
                        Edit Profile

                    </Link>
                }

            </div>

        </section>
    );
};

export default Profile;