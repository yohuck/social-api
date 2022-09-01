const {Schema, Types} = require('mongoose')


const reactionSchema = new Schema(
    {
        reactionBody: {
            type: String,
            required: true
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