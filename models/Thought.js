const { Schema, model } = require('mongoose');
// const reactionSchema = require('./Reaction')

// Schema to create Reaction model
const reactionSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            match: /^([a-z0-9_\.-]{1,280})$/
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

const Thought = model('thought', thoughtSchema)