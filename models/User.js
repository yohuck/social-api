const {Schema, model} = require('mongoose')

//Schema to create a User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

const User = model('user', userSchema)

module.exports = User;