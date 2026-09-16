import { Product } from '../models/index.js';

const initialProducts = [
  {
    title: '36" and 48" Wide 5-S Storage Cabinets',
    image: '/images/AdobeExpressfile(8)1.png',
    priceMin: 1523.66,
    priceMax: 1544.67,
    featured: true,
    popular: false,
  },
  {
    title: '36" Small Parts Storage and Security Cabinets',
    image: '/images/AdobeExpressfile(9)1.png',
    priceMin: 1933.93,
    priceMax: 2180.76,
    featured: true,
    popular: false,
  },
  {
    title: 'Adjustable Spring Safety Gate',
    image: '/images/image-4.png',
    priceMin: 159.91,
    priceMax: 199.55,
    featured: true,
    popular: true,
  },
  {
    title: 'All Welded Heavy Duty Gear Lockers',
    image: '/images/image-5.png',
    priceMin: 534.61,
    priceMax: 1172.86,
    featured: true,
    popular: false,
  },
  {
    title: 'All Welded Heavy Duty Storage Cabinet Lockers',
    image: '/images/image-10.png',
    priceMin: 843.47,
    priceMax: 1178.0,
    featured: false,
    popular: true,
  },
  {
    title: 'Barriers',
    image: '/images/image-11.png',
    priceMin: 1186.0,
    priceMax: 5611.0,
    featured: false,
    popular: true,
  },
  {
    title: 'Bollard Cover',
    image: '/images/image-12.png',
    priceMin: 40.95,
    priceMax: 112.95,
    featured: false,
    popular: true,
  },
  {
    title: 'Bollard Covers',
    image: '/images/image-13.png',
    priceMin: 35.99,
    priceMax: 79.99,
    featured: false,
    popular: false,
  },
  {
    title: 'Bollards',
    image: '/images/image-14.png',
    priceMin: 93.1,
    priceMax: 267.93,
    featured: false,
    popular: true,
  },
  {
    title: 'Bolt Down Bollards',
    image: '/images/image-15.png',
    priceMin: 199.95,
    priceMax: 629.95,
    featured: false,
    popular: true,
  },
  {
    title: 'Bounce Back Bollard',
    image: '/images/image-16.png',
    priceMin: 159.91,
    priceMax: 199.55,
    featured: false,
    popular: false,
  },
  {
    title: 'Box Lockers',
    image: '/images/image-17.png',
    priceMin: 534.61,
    priceMax: 1172.86,
    featured: false,
    popular: true,
  },
];

const formatProduct = product => ({
  id: product.id,
  title: product.title,
  image: product.image,
  price: {
    min: product.priceMin,
    max: product.priceMax,
  },
  featured: product.featured,
  popular: product.popular,
});

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products.map(formatProduct));
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(formatProduct(product));
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { title, image, priceMin, priceMax, featured, popular } = req.body;

    if (!title || !image || priceMin === undefined || priceMax === undefined) {
      return res.status(400).json({ error: 'Title, image, min price, and max price are required' });
    }

    const product = await Product.create({
      title,
      image,
      priceMin: Number(priceMin),
      priceMax: Number(priceMax),
      featured: Boolean(featured),
      popular: Boolean(popular),
    });

    res.status(201).json({ message: 'Product created successfully', product: formatProduct(product) });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const seedProducts = async (req, res, next) => {
  try {
    const currentCount = await Product.count();
    if (currentCount > 0) {
      return res.status(400).json({ message: 'Products already seeded' });
    }

    const createdProducts = await Product.bulkCreate(initialProducts);
    res.json({ message: 'Products seeded successfully', products: createdProducts.map(formatProduct) });
  } catch (error) {
    next(error);
  }
};

export const seedInitialProducts = async () => {
  const currentCount = await Product.count();
  if (currentCount === 0) {
    await Product.bulkCreate(initialProducts);
  }
};
