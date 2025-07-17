import { prisma } from "../connection/clients";

interface GetProductParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "createdAt";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

interface CreateProductInput {
  name: string;
  price: number;
  category: string;
  image?: string;
}

interface UpdateProductInput {
  id: number;
  name: string;
  price: number;
  category: string;
  image?: string;
}

export const getAllProducts = async ({
  category,
  minPrice,
  maxPrice,
  sortBy = "price",
  sortOrder = "desc",
  page = 1,
  limit = 5,
}: GetProductParams) => {
  const skip = (page - 1) * limit;

  const where: any = {
    deletedAt: null,
  };

  if (category) where.category = category;
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = minPrice;
    if (maxPrice) where.price.lte = maxPrice;
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      category: true,
    },
  });

  const total = await prisma.product.count({ where });

  return { total, page, limit, data: products };
};

export const createProduct = async ({
  name,
  price,
  category,
  image,
}: CreateProductInput) => {
  const product = await prisma.product.create({
    data: {
      name,
      price,
      image,
      category,
    },
    select: {
      name: true,
      price: true,
      image: true,
      category: true,
    },
  });

  return product;
};

export const updateProduct = async ({
  id,
  name,
  price,
  category,
  image,
}: UpdateProductInput) => {
  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      price,
      image,
      category,
    },
    select: {
      name: true,
      price: true,
      category: true,
      image: true,
    },
  });

  return product;
};

export const softDelete = async (id: number) => {
  return await prisma.product.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
    select: {
      id: true,
      name: true,
      deletedAt: true,
    },
  });
};

export const restoreDelete = async (id: number) => {
  return await prisma.product.update({
    where: { id },
    data: {
      deletedAt: null,
    },
    select: {
      id: true,
      name: true,
    },
  });
};
