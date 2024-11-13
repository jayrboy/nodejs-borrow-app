import { User } from '../models.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').exec();
    res.json(users);
  } catch (error) {
    console.log({ message: error });
    res.status(500).send('Internal Server Error');
  }
};
