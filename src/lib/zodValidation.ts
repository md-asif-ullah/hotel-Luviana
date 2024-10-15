import { z } from "zod";

export const addRoomFormSchema = z.object({
  roomName: z.string().min(3).max(255),
  categories: z.string().min(3).max(20),
  adults: z.string().min(1).max(10),
  children: z.string(),
  view: z.string().min(3).max(20),
  size: z.string().min(1).max(10),
  bedType: z.string().min(3).max(20),
  amenities: z.string().min(10).max(500),
  description: z.string().min(50).max(500),
  price: z.string().min(1).max(10),
});

export const registerFormSchema = z.object({
  firstName: z.string().min(4).max(20),
  lastName: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(8).max(20),
  confirmPassword: z.string().min(8).max(20),
});

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const BookingInformationFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().min(10).max(15).regex(phoneRegex, "Invalid Number!"),
  message: z.string().optional(),
  paymentMethod: z.string(),
});

export const editCustomerFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  isAdmin: z.string(),
  isBanned: z.string(),
});

export const addReviewFormSchema = z.object({
  comfort_rating: z
    .number()
    .int()
    .min(1, "Select at least 1 star.")
    .max(5, "Rating cannot exceed 5 stars."),

  location_rating: z
    .number()
    .int()
    .min(1, "Select at least 1 star.")
    .max(5, "Rating cannot exceed 5 stars."),

  service_rating: z
    .number()
    .int()
    .min(1, "Select at least 1 star.")
    .max(5, "Rating cannot exceed 5 stars."),

  staff_rating: z
    .number()
    .int()
    .min(1, "Select at least 1 star.")
    .max(5, "Rating cannot exceed 5 stars."),

  comment: z.string().min(1, "Comment cannot be empty."),
});
