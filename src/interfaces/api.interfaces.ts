export interface IUserData {
  jwt:  string;
  user: User;
}

export interface User {
  id:        number;
  username:  string;
  email:     string;
  provider:  string;
  confirmed: boolean;
  blocked:   boolean;
  createdAt: Date;
  updatedAt: Date;
}


export interface IAllProductsResponse {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id:         number;
  attributes: Attributes;
}

export interface Attributes {
  title:       string;
  price:       number;
  createdAt:   Date;
  updatedAt:   Date;
  publishedAt: Date;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page:      number;
  pageSize:  number;
  pageCount: number;
  total:     number;
}


export interface IAllBill {
  data: IAllBillDatum[];
  meta: Meta;
}

export interface IAllBillDatum {
  id:         number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  purchaseDate: Date;
  TotalBill:    number;
  Client:       string;
  billSlug:     string;
  createdAt:    Date;
  updatedAt:    Date;
  publishedAt:  Date;
  products:     Products;
  docNumber: number
}

export interface Products {
  data: ProductsDatum[];
}

export interface ProductsDatum {
  id:         number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  title:       string;
  price:       number;
  createdAt:   Date;
  updatedAt:   Date;
  publishedAt: Date;
}

export interface Meta {
  pagination: Pagination;
}
