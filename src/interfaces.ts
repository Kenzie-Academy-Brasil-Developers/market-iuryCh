interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: 'food' | 'cleaning';
  expirationDate: Date;
}

type TRequestProduct = Omit<IProduct, "id" |"expirationDate">

interface ICleaningProduct extends IProduct {}

interface IFoodProduct extends IProduct {
  calories: number;
}

export { IProduct, ICleaningProduct, IFoodProduct, TRequestProduct };
