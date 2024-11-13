import mongoose from 'mongoose';

// Database Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log(err));

// User Model
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

// Transaction Model
const transactionSchema = mongoose.Schema(
  {
    user_id: String,
    status: String,
    money: Number,
    borrow_by: {
      type: String,
      default: '',
    },
    refund_by: {
      type: String,
      default: '',
    },
    update_by: String,
  },
  { timestamps: true }
);
export let Transaction = mongoose.model('Transaction', transactionSchema);

// TransactionType Model
const transactionTypeSchema = mongoose.Schema(
  {
    type_id: Number,
    type_name: String,
  },
  { timestamps: true }
);
export let TransactionType = mongoose.model(
  'TransactionType',
  transactionTypeSchema
);
