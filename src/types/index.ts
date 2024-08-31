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
  images: string[];
}

export interface ApiResponseTypes {
  status: number;
  success: boolean;
  message: string;
  payload: ApiDataTypes[];
}
