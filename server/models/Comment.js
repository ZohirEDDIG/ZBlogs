import { Schema, model } from 'mongoose';

const commentSchema = Schema(
    {
        blog: { type: Schema.Types.ObjectId, required: true, ref: 'Blog' },
        comment: { type: String, required: true },
        children: { type: [Schema.Types.ObjectId], ref: 'Comment', default: [] },
        author: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
        isReply: { type: Boolean, default: false },
        parent: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
    },
    { timestamps: true }
);

export default model('Comment', commentSchema);