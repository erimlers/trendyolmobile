export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  categoryId: string;
  imageKey: string;
  sizes: string[];
};
