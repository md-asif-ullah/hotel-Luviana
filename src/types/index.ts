export interface ApiDataTypes {
  _id: string;
  name: string;
  categories: string;
  adults: number;
  view: string;
  size: number;
  bedType: string;
  amenities: string;
  children: number;
  description: string;
  price: number;
  quantity: number | undefined;
  images: string[];
}

export interface ApiResponseTypes {
  status: number;
  success: boolean;
  message: string;
  payload: ApiDataTypes[];
}

export interface IUserType {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  isBanned: boolean;
  isAdmin: boolean;
}

export interface IUserResponseTypes {
  status: number;
  success: boolean;
  message: string;
  payload: {
    user: IUserType;
  };
}
