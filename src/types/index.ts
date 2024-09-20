export interface ApiDataTypes {
  _id: string;
  roomName: string;
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
  phoneNumber?: string;
  createdAt: string;
}

export interface IUserResponseTypes {
  status: number;
  success: boolean;
  message: string;
  payload: {
    user: IUserType;
  };
}

export interface IBookingType {
  name: string;
  email: string;
  phoneNumber: string;
  message: string | undefined;
  paymentMethod: string;
  checkIn: string;
  checkOut: string;
  roomQuantity: number;
  roomId: string;
  bookingStatus: string;
  paymentStatus: string;
}

export interface BookingPropsTypes {
  newFormData: IBookingType;
  form: any;
  toast: any;
  setLoading: (loading: boolean) => void;
  paymentId?: string;
  router?: any;
}

export interface IGetBookingTypes {
  _id: string;
  roomName: string;
  email: string;
  phoneNumber: string;
  message: string | undefined;
  paymentMethod: string;
  checkIn: string;
  checkOut: string;
  roomQuantity: number;
  roomId: string;
  bookingStatus: string;
  paymentStatus: string;
  totalPrice: number;
  createdAt: string;
}
