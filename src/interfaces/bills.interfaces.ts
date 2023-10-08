export interface AllBillsByDocNumber {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id:         number;
  attributes: Attributes;
}

export interface Attributes {
  purchaseDate:  Date;
  TotalBill:     number;
  Client:        string;
  createdAt:     Date;
  updatedAt:     Date;
  publishedAt:   Date;
  docNumber:     number;
  productsToBuy: ProductsToBuy[];
}

export interface ProductsToBuy {
  product:  string;
  price:    number;
  quantity: number;
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
