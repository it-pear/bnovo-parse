// export interface Meta {
//   totalCount: number;
// }
export interface Iusers {
  id?: string
  username: string
  password: string
}

export interface IClient {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export interface IHotel {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  email: string;
}

export interface IBooking {
  id: string;
  status_name: string;
  telegram_status: string;
  number: string;
  arrival: string;
  name: string;
  surname: string;
  phone: string;
  client: IClient;
  hotel: IHotel;
}

export interface IPagination {
  sortBy: string;
  descending: boolean;
  page: number;
  rowsPerPage: number;
}

export interface Iquery {
  lim: number
  off: number
  h: number
  sn: string
  st: string
  a: string
  as: string
  ae: string
}
