import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ageValidator = function (value) {
    return value >= 18 && value <= 100;
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    age: {
        type: Number,
        required: true,
        validate: {
            validator: ageValidator,
            message: 'Age must be between 18 and 100'
        }
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    refreshToken: {
        type: String,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'editor', 'admin'],
        default: 'user',
    },
}, {
    timestamps: true,
});

userSchema.virtual('books', {
    ref: 'Book',           // Model to query
    localField: '_id',     // Author's _id
    foreignField: 'author' // Book's author field
})

userSchema.virtual('booksCount', {
    ref: 'Book',           // Model to query
    localField: '_id',     // Author's _id
    foreignField: 'author', // Book's author field
    count: true            // Only get the number of docs
})

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });
userSchema.plugin(mongoosePaginate)

// Create model from schema
const UserModel = mongoose.model('User', userSchema);

export default UserModel;