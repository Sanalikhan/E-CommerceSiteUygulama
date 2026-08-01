import sequelize from '../config/database.js';
import Product from './Product.js';
import User from './User.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

export { sequelize, Product, User, Order, OrderItem };
