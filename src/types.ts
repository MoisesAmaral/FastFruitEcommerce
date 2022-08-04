export interface Product {
  [x: string]: any;
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

export interface Stock {
  id: number;
  amount: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}
