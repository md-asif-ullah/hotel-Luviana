"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomForm from "@/components/CustomForm";
import SecondaryButton from "@/components/SecondaryButton";
import { ChangeEvent, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { useToast } from "@/components/ui/use-toast";
import { addRoomFormSchema } from "@/lib/zodValidation";
import { FormFieldTypes } from "@/components/CustomForm";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { ApiDataTypes } from "@/types";

function AddRoomForm() {
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [room, setRoom] = useState<ApiDataTypes | null>(null);

  const { toast } = useToast();
  const { id } = useParams();
  const router = useRouter();

  // handle image upload

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setNewImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  // remove image

  const removeImage = (index: number) => {
    setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // remove existing image
  const removeExistingImage = (imageUrl: string) => {
    setRemovedImages((prev) => [...prev, imageUrl]);
    setExistingImages((prevImages) =>
      prevImages.filter((image) => image !== imageUrl)
    );
  };

  const form = useForm<z.infer<typeof addRoomFormSchema>>({
    resolver: zodResolver(addRoomFormSchema),
    defaultValues: {
      roomName: "",
      categories: "",
      adults: "",
      children: "",
      view: "",
      size: "",
      bedType: "",
      amenities: "",
      description: "",
      price: "",
    },
  });

  // fetch room data

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/rooms/${id}`);
        const data = await res.json();

        if (data.success) {
          setRoom(data.payload.roomDetails);
        }
        if (!data.success) {
          setError(data.message);
        }
      } catch (error) {
        setError("Failed to fetch room data");
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  // get room data and set form values

  useEffect(() => {
    if (room) {
      form.setValue("roomName", room.roomName);
      form.setValue("categories", room.categories);
      form.setValue("adults", room.adults.toString());
      form.setValue("children", room.children.toString());
      form.setValue("view", room.view);
      form.setValue("size", room.size.toString());
      form.setValue("bedType", room.bedType);
      form.setValue("amenities", room.amenities);
      form.setValue("description", room.description);
      form.setValue("price", room.price.toString());
      setExistingImages(room.images);
    }
  }, [room, form]);

  // handle form information submission

  async function onSubmit(values: z.infer<typeof addRoomFormSchema>) {
    if (newImages.length === 0 && existingImages.length === 0) {
      return setError("Please upload at least one image");
    }

    const formData = new FormData();
    formData.append("roomName", values.roomName);
    formData.append("categories", values.categories);
    formData.append("adults", values.adults);
    formData.append("children", values.children);
    formData.append("view", values.view);
    formData.append("size", values.size);
    formData.append("bedType", values.bedType);
    formData.append("amenities", values.amenities);
    formData.append("description", values.description);
    formData.append("price", values.price);

    for (let i = 0; i < newImages.length; i++) {
      formData.append("newImages", newImages[i]);
    }

    for (let i = 0; i < removedImages.length; i++) {
      formData.append("removedImages", removedImages[i]);
    }

    try {
      setLoading(true);
      const res = await axios.put(`/api/rooms/${id}`, formData);

      if (res.data.success) {
        setLoading(false);
        form.reset();
        setNewImages([]);
        setExistingImages([]);
        setRemovedImages([]);
        router.push("/dashboard/rooms");
        router.refresh();
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
    <div className="xl:mx-auto max-w-4xl p-8 bg-white rounded-lg shadow-lg mb-10 md:mx-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Room Name */}
          <CustomForm
            FieldType={FormFieldTypes.Input}
            control={form.control}
            name="roomName"
            label="Room Name"
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

          <CustomForm
            FieldType={FormFieldTypes.Input}
            control={form.control}
            name="price"
            label="Prize"
            type="number"
            placeholder="Enter room prize"
          />

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

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {existingImages.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image}
                    alt={`Existing image ${index + 1}`}
                    width={250}
                    height={200}
                    className="rounded-lg shadow-md object-cover w-full h-48"
                  />
                  <i
                    onClick={() => removeExistingImage(image)}
                    className="absolute top-2 right-2 z-10 text-white bg-black p-1 rounded-full cursor-pointer hover:bg-red-500 transition-colors"
                  >
                    <RxCross2 />
                  </i>
                </div>
              ))}
            </div>
          )}

          {/* new images */}

          {newImages.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {newImages.map((image, index) => {
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
            text="Update Room"
            className="w-full"
          />
        </form>
      </Form>
    </div>
  );
}

export default AddRoomForm;
