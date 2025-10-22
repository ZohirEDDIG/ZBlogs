import { customAlphabet } from 'nanoid';

import User from '../models/User.js';

const generateUniqueUsername = async (email) => {
    const baseUsername = email.split('@')[0];
    let username = baseUsername;

    const digits = '0123456789';
    const nanoidDigits = customAlphabet(digits, 3);

    let user = await User.findOne({ 'personalInfo.username': username });

    while (user) {
        username = `${baseUsername}${nanoidDigits()}`;
        user = await User.findOne({ 'personalInfo.username': username });
    }

    return username;
};

const generateProfileImage = () => {
    const profileImages = ['https://api.dicebear.com/9.x/thumbs/svg?seed=Zed', 
                            'https://api.dicebear.com/9.x/thumbs/svg?seed=Alex', 
                            'https://api.dicebear.com/9.x/thumbs/svg?seed=Nova', 
                            'https://api.dicebear.com/9.x/thumbs/svg?seed=Luna', 
                            'https://api.dicebear.com/9.x/thumbs/svg?seed=Kai', 
                            'https://api.dicebear.com/9.x/thumbs/svg?seed=River', 
                            'https://api.dicebear.com/9.x/thumbs/svg?seed=Blaze', 
                            'https://api.dicebear.com/9.x/thumbs/svg?seed=Echo', 
                            'https://api.dicebear.com/9.x/thumbs/svg?seed=Ivy', 
                            'https://api.dicebear.com/9.x/thumbs/svg?seed=Rune'
    ];

    const randomIndex = Math.floor(Math.random() * profileImages.length);

    const profileImage = profileImages[randomIndex];
    return profileImage;
};

export { generateUniqueUsername, generateProfileImage };