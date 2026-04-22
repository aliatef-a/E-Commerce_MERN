import { cartModel } from "../modules/cartModels";
import { productModel } from "../modules/productModels";
import { calculateCartTotal } from "../utils/cart";

interface CreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
}

export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    cart = await createCartForUser({ userId });
  }

  return {
    data: {
      statusCode: 200,
      cart: cart,
    },
  };
};

interface IaddItemToCart {
  userId: string;
  productId: any;
  quantity: number;
}

export const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: IaddItemToCart) => {
  const { data } = await getActiveCartForUser({ userId });

  const cart = data.cart;

  const existInCart = cart.items.find(
    (p: any) => p.product.toString() === productId,
  );

  if (existInCart) {
    return {
      data: {
        statusCode: 400,
        message: "Item already exists in cart!",
      },
    };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return {
      data: {
        statusCode: 400,
        message: "Product not found!",
      },
    };
  }

  if (quantity > product.stock) {
    return {
      data: {
        statusCode: 400,
        message: "Product stock is not enough!",
      },
    };
  }

  cart.items.push({
    product: productId,
    unitePrice: product.price,
    quantity,
  });

  // optional: recalculate total
  cart.totalAmount += product.price * quantity;

  await cart.save();

  return {
    data: {
      statusCode: 200,
      cart,
    },
  };
};

export const updateItemInCart = async ({
  userId,
  productId,
  quantity,
}: IaddItemToCart) => {
  const { data } = await getActiveCartForUser({ userId });
  const cart = data.cart;
  const existInCart = cart.items.find(
    (p: any) => p.product.toString() === productId,
  );
  if (!existInCart) {
    return {
      data: {
        statusCode: 400,
        message: "Product not found!",
      },
    };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return {
      data: {
        statusCode: 400,
        message: "Product not found!",
      },
    };
  }

  if (quantity > product.stock) {
    return {
      data: {
        statusCode: 400,
        message: "Product stock is not enough!",
      },
    };
  }

  existInCart.quantity = quantity;
  const otherCartItems = cart.items.filter(
    (p: any) => p.product.toString() !== productId
  );
  const updatedItems = [...otherCartItems, existInCart];
  cart.items = updatedItems;
  cart.totalAmount = calculateCartTotal(updatedItems);

  await cart.save();

  return {
    data: {
      statusCode: 200,
      cart,
    },
  };
};

interface DeleteItemeFromCart {
  userId: string;
  productId: string | string[] | undefined
}


export const deleteItemFormCart = async ({
  userId,
  productId,
}: DeleteItemeFromCart) => {
  const { data } = await getActiveCartForUser({ userId });
  const cart = data.cart;

  const existInCart = cart.items.find(
    (p: any) => p.product.toString() === productId
  );

  if (!existInCart) {
    return {
      data: {
        statusCode: 400,
        message: "Product not found!",
      },
    };
  }

  // remove item
  cart.items = cart.items.filter(
    (p: any) => p.product.toString() !== productId
  );

  // recalc total
  cart.totalAmount = calculateCartTotal(cart.items);

  await cart.save();

  return {
    data: {
      statusCode: 200,
      cart,
    },
  };
};

interface ClearCart {
  userId: string;

}

export const clearCart = async ({ userId }: ClearCart) => {
  const { data } = await getActiveCartForUser({ userId });
  const cart = data.cart;
  cart.items = [];
  cart.totalAmount = 0;
  await cart.save();
  return {
    data: {
      statusCode: 200,
      cart,
    },
  };
}