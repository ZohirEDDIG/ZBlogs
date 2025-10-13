import { Schema, model } from 'mongoose';

const userSchema = Schema(
    {
        personalInfo: {
            fullName: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            password: { type: String, default: '' },
            username: { type: String, required: true, unique: true },
            profileImage: { type: String, required: true },
            bio: { type: String, default: '' },
        },

        socialLinks: {
            facebook: { type: String, default: '' },
            instagram: { type: String, default: '' },
            twitter: { type: String, default: '' },
            github: { type: String, default: '' },
            website: { type: String, default: '' },
            youtube: { type: String, default: '' },
        },

        accountInfo: {
            totalPosts: { type: Number, default: 0 },
            totalReads: { type: Number, default: 0 },
        },

        googleAuth: { type: Boolean, default: false },

        blogs: { type: [Schema.Types.ObjectId], ref: 'Blog', default: [] },
    },
    { timestamps: true }
);

export default model('User', userSchema);