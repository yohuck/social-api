const {Schema, Types} = require('mongoose')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            match: /^([a-z0-9_\.-]{1,280})$/
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
    {
        toJson: {
            virtuals: true,
        },
        id: false,
    }
)

module.exports = reactionSchema;