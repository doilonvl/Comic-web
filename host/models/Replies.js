import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const replySchema = new Schema({
  commentId: {
    type: Schema.Types.ObjectId, 
    required: true,
    ref: 'Comments' 
  },
  UserId: {
    type: Schema.Types.ObjectId, 
    required: true,
    ref: 'Users' 
  },
  reply: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
},{
  timestamps: true
});

const Replies = mongoose.model('Replies', replySchema);

module.exports = Replies;
