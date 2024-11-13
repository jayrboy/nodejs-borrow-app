import mongoose from 'mongoose';
import { type } from 'os';

//* Connection
mongoose
  .connect('mongodb://localhost/db1')
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log(err));

//* User Model
const userSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    name: String,
    money: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
export let User = mongoose.model('User', userSchema);

//* Transaction Model
const transactionSchema = mongoose.Schema(
  {
    user_id: String,
    status: String,
    money: Number,
    borrow_by: String,
    refund_by: String,
    update_by: String,
  },
  { timestamps: true }
);
export let Transaction = mongoose.model('Transaction', transactionSchema);
