import { User, Transaction, TransactionType } from '../models.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').exec();
    res.json(users);
  } catch (error) {
    console.log({ message: error });
    res.status(500).send('Error to get users');
  }
};

export const addMoney = (req, res) => {
  try {
    const { _id, money, update_by } = req.body;

    User.findById(_id).then(async (user) => {
      if (!user) {
        return res.status(404).send('User not found');
      }

      // เพิ่มเงินในบัญชีผู้ใช้
      user.money += money;
      await user.save();

      // ค้นหา TransactionType 1 ที่ตรงกับการ "เพิ่มเงิน"
      const transactionType = await TransactionType.findOne({ type_id: 1 });
      if (!transactionType) {
        return res.status(400).send('Transaction type not found');
      }

      // สร้างธุรกรรมใหม่
      const transaction = new Transaction({
        user_id: _id,
        status: transactionType.type_name,
        money,
        update_by,
      });
      await transaction.save();

      res.status(200).json({
        message: 'Money added and transaction recorded successfully',
        money: user.money,
      });
    });
  } catch (error) {
    console.log({ message: error });
    res.status(500).send('Unexpected server error');
  }
};
