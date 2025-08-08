import { db } from '../config/firebase';
import { Product } from '../models/product.model';

export const getProductRepository = async (id: string) => {
  const productSnapshot = await db.collection('products').doc(id).get();
  const product = productSnapshot.data() as Product;
  return product;
};

export const getProductsRepository = async () => {
  const productsSnapshot = await db.collection('products').get();
  const products = productsSnapshot.docs.map(
    doc => ({ ...doc.data(), id: doc.id } as Product)
  );
  return products;
};

export const createProductRepository = async (product: Product) => {
  await db.collection('products').add(product);
  return product;
};

export const updateProductRepository = async (id: string, product: Product) => {
  await db
    .collection('products')
    .doc(id)
    .update({ ...product });
  return product;
};

export const deleteProduct = async (id: string) => {
  await db.collection('products').doc(id).delete();
};
