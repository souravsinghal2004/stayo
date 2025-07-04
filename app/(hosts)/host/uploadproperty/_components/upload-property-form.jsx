"use client";

import { useState } from "react";
import React, { useCallback } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { Loader2 } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addProperty } from "@/actions/add-property";
import { toast } from "sonner";
import { useEffect } from "react";

import { useRouter } from "next/navigation";






export const AddStayoForm = () => {

const router = useRouter();
  const propertyFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    location: z.string().min(1, "Location is required"),
    guests: z
      .string()
      .min(1, "Number of guests is required")
      .refine((val) => !isNaN(parseInt(val)), "Must be a valid number"),
    price: z
      .string()
      .min(1, "Price is required")
      .refine((val) => !isNaN(parseFloat(val)), "Must be a valid number"),
    bedrooms: z
      .string()
      .min(1, "Number of bedrooms is required")
      .refine((val) => !isNaN(parseInt(val)), "Must be a valid number"),
    bathrooms: z
      .string()
      .min(1, "Number of bathrooms is required")
      .refine((val) => !isNaN(parseInt(val)), "Must be a valid number"),
    bhk: z
      .string()
      .min(1, "BHK is required")
      .refine((val) => !isNaN(parseInt(val)), "Must be a valid number"),
    description: z.string().min(10, "Description must be at least 10 characters"),
  });


  // Initialize form with react-hook-form and zod
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: "",
      location: "",
      guests: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      bhk: "",
      description: "",
    },
  });

  const [imageError, setImageError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);


  // Custom hooks for API calls
  


  
  const {
    loading: addPropertyLoading,
    fn: addPropertyFn,
    data: addPropertyResult,
  } = useFetch(addProperty);


  // Remove image from upload preview
  const removeImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };


  // Handle successful car additio
  useEffect(() => {
    if (addPropertyResult?.success) {
      toast.success("Property added successfully");
      reset(); // from useForm
setUploadedImages([]);

      router.push("/host");
    }
  }, [addPropertyResult, router]);
  const onMultiImagesDrop = useCallback((acceptedFiles) => {
    const validFiles = acceptedFiles.filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 5MB limit and will be skipped`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);

        // Process the images
        const newImages = [];
        validFiles.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            newImages.push(e.target.result);

            // When all images are processed
            if (newImages.length === validFiles.length) {
              setUploadedImages((prev) => [...prev, ...newImages]);
              setUploadProgress(0);
              setImageError("");
              toast.success(
                `Successfully uploaded ${validFiles.length} images`
              );
            }
          };
          reader.readAsDataURL(file);
        });
      }
    }, 200);
  }, []);


  const {
    getRootProps: getMultiImageRootProps,
    getInputProps: getMultiImageInputProps,
  } = useDropzone({
    onDrop: onMultiImagesDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: true,
  });




  const onSubmit = async (data) => {
  console.log("Form submitted with data:", data);

  if (uploadedImages.length === 0) {
    setImageError("Please upload at least one image");
    return;
  }

  const propertyData = {
    ...data,
    price: parseFloat(data.price),
    guests: parseInt(data.guests),
    bedrooms: parseInt(data.bedrooms),
    bathrooms: parseInt(data.bathrooms),
    bhk: parseInt(data.bhk),
  };

  try {
    await addPropertyFn({ propertyData, images: uploadedImages });
  } catch (err) {
    toast.error("Failed to add property. Please try again.");
    console.error("Property add error:", err);
  }
};

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>
            Enter the details of your property.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Beachfront Villa in Goa"
                  {...register("title")}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-xs text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>
              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  placeholder="e.g. 2500"
                  {...register("price")}
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && (
                  <p className="text-xs text-red-500">{errors.price.message}</p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g. Goa"
                  {...register("location")}
                  className={errors.location ? "border-red-500" : ""}
                />
                {errors.location && (
                  <p className="text-xs text-red-500">{errors.location.message}</p>
                )}
              </div>

              {/* Bedrooms */}
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  placeholder="e.g. 2"
                  {...register("bedrooms")}
                  className={errors.bedrooms ? "border-red-500" : ""}
                />
                {errors.bedrooms && (
                  <p className="text-xs text-red-500">{errors.bedrooms.message}</p>
                )}
              </div>

              {/* Bathrooms */}
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  placeholder="e.g. 1"
                  {...register("bathrooms")}
                  className={errors.bathrooms ? "border-red-500" : ""}
                />
                {errors.bathrooms && (
                  <p className="text-xs text-red-500">{errors.bathrooms.message}</p>
                )}
              </div>

              {/* BHK */}
              <div className="space-y-2">
                <Label htmlFor="bhk">BHK</Label>
                <Input
                  id="bhk"
                  placeholder="e.g. 2"
                  {...register("bhk")}
                  className={errors.bhk ? "border-red-500" : ""}
                />
                {errors.bhk && (
                  <p className="text-xs text-red-500">{errors.bhk.message}</p>
                )}
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <Label htmlFor="guests">Guests</Label>
                <Input
                  id="guests"
                  placeholder="e.g. 4"
                  {...register("guests")}
                  className={errors.guests ? "border-red-500" : ""}
                />
                {errors.guests && (
                  <p className="text-xs text-red-500">{errors.guests.message}</p>
                )}
              </div>
              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="guests">Description</Label>
                <Input
                  id="description"
                  placeholder="e.g. Enjoy a peaceful beachfront stay with all modern amenities"
                  {...register("description")}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-xs text-red-500">{errors.description.message}</p>
                )}
              </div>
            </div>


            {/* Dropzone */}
            <div>
              <Label
                htmlFor="images"
                className={imageError ? "text-red-500" : ""}
              >
                Images{" "}
                {imageError && <span className="text-red-500">*</span>}
              </Label>

              <div className="mt-2">
                <div
                  {...getMultiImageRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition ${imageError ? "border-red-500" : "border-gray-300"
                    }`}
                >
                  <input {...getMultiImageInputProps()} />

                  <div className="flex flex-col items-center justify-center">

                    <Upload className="h-12 w-12 text-gray-400 mb-3" />
                    <span className="text-sm text-gray-600">
                      Drag & drop or click to upload multiple images
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      (JPG, PNG, WebP, max 5MB each)
                    </span>
                  </div>
                </div>
                {imageError && (
                  <p className="text-xs text-red-500 mt-1">{imageError}</p>
                )}
                {uploadProgress > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}


              </div>


              {/* Image Previews */}
              {uploadedImages.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">
                    Uploaded Images ({uploadedImages.length})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={image}
                          alt={`property image ${index + 1}`}
                          height={50}
                          width={50}
                          className="h-28 w-full object-cover rounded-md"
                          priority
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}







              {/* finl drop */}

            </div>
            <Button
              type="submit"
              className="w-full md:w-auto"
           disabled={addPropertyLoading}

            >
              {addPropertyLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Property...
                </>
              ) : (
                "Add Property"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
