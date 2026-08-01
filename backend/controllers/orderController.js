import { Order, OrderItem, Product } from '../models/index.js';

export const createOrder = async (req, res, next) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order items are required' });
    }

    const productIds = items.map((item) => item.productId);
    const products = await Product.findAll({ where: { id: productIds } });
    if (products.length !== productIds.length) {
      return res.status(400).json({ error: 'One or more products are invalid' });
    }

    const productMap = new Map(products.map((product) => [product.id, product]));
    let totalAmount = 0;

    const orderItems = items.map((item) => {
      const product = productMap.get(item.productId);
      const quantity = item.quantity || 1;
      const unitPrice = product.priceMin;
      totalAmount += unitPrice * quantity;

      return {
        productId: item.productId,
        quantity,
        unitPrice,
      };
    });

    const order = await Order.create({
      userId: req.user.id,
      totalAmount,
      status: 'pending',
    });

    const createdItems = await OrderItem.bulkCreate(
      orderItems.map((item) => ({
        ...item,
        orderId: order.id,
      }))
    );

    res.status(201).json({ order, items: createdItems });
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: OrderItem,
          include: [Product],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({ orders });
  } catch (error) {
    next(error);
  }
};
