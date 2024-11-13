import { User } from '../models.js';

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
    const { _id, money } = req.body;
    User.findById(_id)
      .exec()
      .then((doc) => {
        if (!doc) {
          return res.status(404).send('User not found');
        }
        doc.money += money;
        return doc.save();
      })
      .then((user) =>
        res.status(200).json({
          message: 'Money added successfully',
          money: user.money,
        })
      );
  } catch (error) {
    console.log({ message: error });
    res.status(500).send('Error to add money');
  }
};
