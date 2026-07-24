import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const bookSchema = new mongoose.Schema({
    title: String,
    isbn: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    publishedYear: Number
}, { timestamps: true });

bookSchema.index(
    { title: 'text', isbn: 'text' });

bookSchema.plugin(mongoosePaginate)

const BookModel = mongoose.model('Book', bookSchema);

export default BookModel;