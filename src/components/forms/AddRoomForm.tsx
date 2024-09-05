"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomForm from "../CustomForm";
import SecondaryButton from "../SecondaryButton";
import { ChangeEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { useToast } from "../ui/use-toast";
import { addRoomFormSchema } from "@/lib/zodValidation";
import { FormFieldTypes } from "../CustomForm";

function AddRoomForm() {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // handle image upload

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  // remove image

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const { toast } = useToast();

  const form = useForm<z.infer<typeof addRoomFormSchema>>({
    resolver: zodResolver(addRoomFormSchema),
    defaultValues: {
      name: "",
      categories: "",
      adults: "",
      children: "",
      view: "",
      size: "",
      bedType: "",
      amenities: "",
      description: "",
      price: "",
      quantity: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addRoomFormSchema>) {
    if (images.length === 0) {
      return setError("Please upload at least one image");
    }
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("categories", values.categories);
    formData.append("adults", values.adults);
    formData.append("children", values.children);
    formData.append("view", values.view);
    formData.append("size", values.size);
    formData.append("bedType", values.bedType);
    formData.append("amenities", values.amenities);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      setLoading(true);
      const res = await fetch("/api/rooms", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Failed to submit form");
      }
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setLoading(false);
        form.reset();
        setImages([]);
        toast({
          title: "success",
          description: "Room has been added successfully",
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "something went wrong please try again",
      });
    }
  }

  return (
    <div className="xl:mx-auto max-w-4xl p-8 text-white rounded-lg shadow-lg mb-10 md:mx-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Room Name */}
          <CustomForm
            FieldType={FormFieldTypes.Input}
            control={form.control}
            name="name"
            label="Name"
            type="text"
            placeholder="Enter your room name"
          />

          {/* Adults and Children */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomForm
              FieldType={FormFieldTypes.Input}
              control={form.control}
              name="adults"
              label="Adults"
              type="number"
              placeholder="Enter number of adults"
            />
            <CustomForm
              FieldType={FormFieldTypes.Input}
              control={form.control}
              name="children"
              label="Children"
              type="number"
              placeholder="Enter number of children"
            />
          </div>

          {/* View and Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomForm
              FieldType={FormFieldTypes.Input}
              control={form.control}
              name="view"
              label="View"
              type="text"
              placeholder="Enter room view"
            />
            <CustomForm
              FieldType={FormFieldTypes.Input}
              control={form.control}
              name="size"
              label="Size"
              type="number"
              placeholder="Enter room size"
            />
          </div>

          {/* Bed Type and Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomForm
              FieldType={FormFieldTypes.Input}
              control={form.control}
              name="bedType"
              label="Bed type"
              type="text"
              placeholder="Enter bed type"
            />
            <CustomForm
              FieldType={FormFieldTypes.Input}
              control={form.control}
              name="categories"
              label="Categories"
              type="text"
              placeholder="Enter room categories"
            />
          </div>

          {/* Prize */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomForm
              FieldType={FormFieldTypes.Input}
              control={form.control}
              name="price"
              label="Prize"
              type="number"
              placeholder="Enter room prize"
            />
            <CustomForm
              FieldType={FormFieldTypes.Input}
              control={form.control}
              name="quantity"
              label="Quantity"
              type="number"
              placeholder="Enter room quantity"
            />
          </div>

          {/* Amenities */}
          <CustomForm
            FieldType={FormFieldTypes.TextArea}
            control={form.control}
            name="amenities"
            label="Amenities"
            type="text"
            placeholder="Enter room amenities"
          />

          {/* Description */}
          <CustomForm
            FieldType={FormFieldTypes.TextArea}
            control={form.control}
            name="description"
            label="Description"
            type="text"
            placeholder="Enter room description"
          />

          {/* Image Upload */}

          {images.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {images.map((image, index) => {
                const imageUrl = URL.createObjectURL(image);
                return (
                  <div key={index} className="relative">
                    <Image
                      src={imageUrl}
                      alt={`Uploaded image ${index + 1}`}
                      width={250}
                      height={200}
                      className="rounded-lg shadow-md object-cover w-full h-48"
                    />
                    <i
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 z-10 text-white bg-black p-1 rounded-full cursor-pointer hover:bg-red-500 transition-colors"
                    >
                      <RxCross2 />
                    </i>
                  </div>
                );
              })}
            </div>
          )}

          <div className="space-y-2">
            <Label>Image</Label>
            <Input
              type="file"
              multiple
              onChange={handleImage}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-700 text-sm">{error}</p>
          </div>

          {/* Submit Button */}
          <SecondaryButton
            disabled={loading}
            loading={loading}
            type="submit"
            text="Add Room"
            className="w-full"
          />
        </form>
      </Form>
    </div>
  );
}

export default AddRoomForm;
