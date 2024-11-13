import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models.js';

export const register = async (req, res) => {
  try {
    let { username, password, name } = req.body;
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).send('User Already Exists!');
    } else {
      // encrypt
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      user = new User({
        username,
        password,
        name,
      });

      await user.save();
      res.status(200).send('Register Successfully');
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    let username = req.body.username || '';
    let password = req.body.password || '';

    // Check if the user exists
    let user = await User.findOneAndUpdate(
      { username },
      { useFindAndModify: false }
    );
    if (!user) {
      return res.status(404).send('User Not Found!!!');
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Password Invalid!!!');
    }

    // Generate token
    const payload = {
      username: user.username,
      name: user.name,
      money: user.money,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (error, token) => {
        if (error) throw error;
        res.json({ token, payload });
      }
    );
  } catch (error) {
    console.log({ message: error });
    res.status(500).send('Internal Server Error');
  }
};
