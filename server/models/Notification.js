import { Schema, model } from 'mongoose';

const notificationSchema = mongoose.Schema(
    {
        type: { type: String, enum: ['like', 'comment', 'reply'], required: true },
        blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
        notificationFor: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        notificationFrom: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        comment: { type: Schema.Types.ObjectId, ref: 'Comment', default: '' },
        reply: { type: Schema.Types.ObjectId, ref: 'Comment', default: '' },
        repliedOnComment: { type: Schema.Types.ObjectId, ref: 'Comment', default: '' },
        seen: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

export default model('Notification', notificationSchema);