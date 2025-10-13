import { Schema, model } from 'mongoose';

const blogSchema = Schema(
    {
        blogId: { type: String, unique: true, required: true },
        cover: { type: String, required: true },
        title: { type: String, maxlength: 100, required: true },
        description: { type: String, maxlength: 200, required: true },
        content: { type: [], required: true },
        topics: { type: [String], required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        activity: {
            totalLikes: { type: Number, default: 0 },
            totalComments: { type: Number, default: 0 },
            totalReads: { type: Number, default: 0 },
            totalParentComments: { type: Number, default: 0 },
        },
        comments: { type: [Schema.Types.ObjectId], ref: 'Comment', default: [] },
        isDraft: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default model('Blog', blogSchema);