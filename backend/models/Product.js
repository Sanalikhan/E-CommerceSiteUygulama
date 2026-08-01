import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priceMin: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  priceMax: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  popular: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Product;
