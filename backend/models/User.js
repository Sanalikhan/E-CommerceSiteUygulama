import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  termsAccepted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default User;
