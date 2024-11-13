import { TransactionType } from '../models.js';

export const createTransactionType = async (req, res) => {
  try {
    const { type_id, type_name } = req.body;

    // ตรวจสอบว่ามี type_id นี้อยู่แล้วหรือไม่
    const existingType = await TransactionType.findOne({ type_id });
    if (existingType) {
      return res
        .status(400)
        .json({ message: 'Transaction type already exists' });
    }

    const transactionType = new TransactionType({ type_id, type_name });
    await transactionType.save();
    res.status(200).json({
      message: 'Transaction type created successfully',
      transactionType,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error creating transaction type');
  }
};
