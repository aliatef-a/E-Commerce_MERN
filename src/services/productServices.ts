import { productModel } from "../modules/productModels";

export const getAllProducts = async () => {
  const product = await productModel.find();
  return {
    data: {
      statusCode: 200,
      data: product,
    },
  };
};

export const seedInitialProducts = async () => {
  const initialProducts = [
    {
      title: "Product 1",
      image: "https://via.placeholder.com/150",
      price: 10,
      stock: 10,
    },
    {
      title: "Product 2",
      image: "https://via.placeholder.com/150",
      price: 20,
      stock: 10,
    },
    {
      title: "Product 3",
      image: "https://via.placeholder.com/150",
      price: 30,
      stock: 10,
    },
  ];
  const { data } = await getAllProducts();
  if (data.data.length === 0) {
    await productModel.insertMany(initialProducts);
  }
};
