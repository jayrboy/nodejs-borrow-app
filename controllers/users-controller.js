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

export const addBorrow = async (req, res) => {
  try {
    const { _id, money, update_by, user_id } = req.body;

    // ยืมเงิน
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // ลดเงินในบัญชีผู้ใช้
    user.money -= money;
    await user.save();

    // ค้นหา TransactionType 2 ที่ตรงกับการ "ยืมเงิน"
    const transactionType = await TransactionType.findOne({ type_id: 2 });
    if (!transactionType) {
      return res.status(400).send('Transaction type not found');
    }

    // สร้างธุรกรรมใหม่
    const transaction = new Transaction({
      user_id: user_id,
      status: transactionType.type_name,
      borrow_by: user.name,
      money,
      update_by,
    });
    await transaction.save();

    // เพิ่มเงินในบัญชีผู้ใช้ที่ยืม
    const userToUpdate = await User.findById(user_id);
    if (!userToUpdate) {
      return res.status(404).send('User to update not found');
    }

    userToUpdate.money += money;
    await userToUpdate.save();

    // ส่งผลลัพธ์กลับ
    res.status(200).json({
      message: 'Borrow added and transaction recorded successfully',
      money: userToUpdate.money,
    });
  } catch (error) {
    console.log({ message: error });
    res.status(500).send('Unexpected server error');
  }
};

export const addRefund = async (req, res) => {
  try {
    const { _id, money, update_by, user_id } = req.body;

    // ยืมเงิน
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // เพิ่มเงินที่ยืมในบัญชีผู้ใช้ที่ยืมมา
    user.money += money;
    await user.save();

    // ค้นหา TransactionType 3 ที่ตรงกับการ "คืนเงิน"
    const transactionType = await TransactionType.findOne({ type_id: 3 });
    if (!transactionType) {
      return res.status(400).send('Transaction type not found');
    }

    // สร้างธุรกรรมใหม่
    const transaction = new Transaction({
      user_id: user_id,
      status: transactionType.type_name,
      borrow_by: user.name,
      money,
      update_by,
    });
    await transaction.save();

    // เพิ่มเงินในบัญชีผู้ใช้ที่ยืม
    const userToUpdate = await User.findById(user_id);
    if (!userToUpdate) {
      return res.status(404).send('User to update not found');
    }

    userToUpdate.money -= money;
    await userToUpdate.save();

    // ส่งผลลัพธ์กลับ
    res.status(200).json({
      message: 'Borrow added and transaction recorded successfully',
      money: userToUpdate.money,
    });
  } catch (error) {
    console.log({ message: error });
    res.status(500).send('Unexpected server error');
  }
};
