import { Order, OrderItem, Product, User } from '../models/index.js';

const formatMoney = (value) => Number(value || 0);
/*
const getAdminDashboard = (req,res,next)=>{
  try{

  }
  catch{

  }
}
  */


export const getAdminDashboard = async (req, res, next) => {
  try {
    const [products, orders, users, totalRevenue] = await Promise.all([
      Product.findAll({ order: [['createdAt', 'DESC']] }),
      Order.findAll({
        include: [
          {
            model: OrderItem,
            include: [Product],
          },
          {
            model: User,
            attributes: ['id', 'name', 'email'],
          },
        ],
        order: [['createdAt', 'DESC']],
      }),
      User.findAll({
        order: [['createdAt', 'DESC']],
      }),
      Order.sum('totalAmount'),
    ]);

    const totalOrders = orders.length;
    const totalCustomers = users.filter((user) => user.role === 'customer').length;
    const totalProducts = products.length;
    const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

    const salesByMonth = Array.from({ length: 6 }, (_, index) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - index));
      const monthLabel = date.toLocaleString('en-US', { month: 'short' });
      const monthValue = orders
        .filter((order) => {
          const orderDate = new Date(order.createdAt);
          return (
            orderDate.getMonth() === date.getMonth() &&
            orderDate.getFullYear() === date.getFullYear()
          );
        })
        .reduce((sum, order) => sum + formatMoney(order.totalAmount), 0);

      return { month: monthLabel, total: monthValue };
    });

    const recentOrders = orders.slice(0, 8).map((order) => ({
      id: order.id,
      total: Number(order.totalAmount || 0),
      status: order.status,
      createdAt: order.createdAt,
      customer: order.User ? `${order.User.name || 'Customer'}` : 'Guest',
      items: order.OrderItems?.map((item) => ({
        id: item.id,
        title: item.Product?.title || 'Product',
        quantity: item.quantity,
      })) || [],
    }));

    res.json({
      summary: {
        revenue: Number(totalRevenue || 0),
        totalOrders,
        totalCustomers,
        totalProducts,
        avgOrderValue: Number(avgOrderValue || 0),
      },
      salesByMonth,
      recentOrders,
      products: products.map((product) => ({
        id: product.id,
        title: product.title,
        image: product.image,
        priceMin: Number(product.priceMin || 0),
        priceMax: Number(product.priceMax || 0),
        featured: product.featured,
        popular: product.popular,
        createdAt: product.createdAt,
      })),
    });
  } catch (error) {
    next(error);
  }
};
