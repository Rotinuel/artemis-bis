"use server";

import slugify from 'slugify';


import { CategoriesWithProductsResponse } from "@/app/admin/categories/categories.types";
import { CreateCategorySchemaServer } from "@/app/admin/categories/create-category.schema";
import { createClient } from "@/supabase/client";

const supabase = createClient;
export const getCategoriesWithProducts =
  async (): Promise<CategoriesWithProductsResponse> => {
    const supabase = createClient();
    const { data, error } = await supabase.from('category')
      .select('*, products:product(*)')
      .returns<CategoriesWithProductsResponse>();

    if (error) throw new Error(`Error fetching categories: ${error.message}`);

    return data || [];
  };

  export const imageUploadHandler = async (formData: FormData) => {
    if (!formData) return;
    const fileEntry = formData.get('file') as File;

   if (!(fileEntry instanceof File)) throw new Error('Expected a file');
   const fileName = fileEntry.name;

   try {
    const { data, error } = await supabase.storage.from('app-images').upload(fileName, fileEntry, {
      cacheControl:'3600',
      upsert: true,
    });
    if(error){
      console.error('Error uploading image:', error);
      throw new Error('Error uploading image')
    }
    const {data: {publicUrl}} = await supabase.storage.from('app-images').getPublicUrl(data.path);
    return publicUrl;
   } catch (error){
    console.error('Error uploading image', error);
    throw new Error('Error uploading image');
   }
  }

  // export const imageUploadHandler = async (formData: FormData) => {
  //   if (!formData) return;
  
  //   const fileEntry = formData.get('file');
  //   if (!(fileEntry instanceof File)) {
  //     throw new Error('Expected a file');
  //   }
  
  //   const fileName = fileEntry.name;
  
  //   try {
  //     const { data, error } = await supabase.storage
  //       .from('app-images')
  //       .upload(fileName, fileEntry, {
  //         cacheControl: '3600',
  //         upsert: true,
  //       });
  
  //     if (error) {
  //       console.error('Error uploading image:', error);
  //       throw new Error('Error uploading image');
  //     }
  
  //     const { data: publicUrlData, error: publicUrlError } = await supabase.storage
  //       .from('app-images')
  //       .getPublicUrl(data.path);
  
  //     if (publicUrlError) {
  //       console.error('Error retrieving public URL:', publicUrlError);
  //       throw new Error('Error retrieving public URL');
  //     }
  
  //     return publicUrlData.publicUrl;
  //   } catch (error) {
  //     console.error('Error handling image upload:', error);
  //     throw new Error('Error handling image upload');
  //   }
  // };
  

  export const createCategory = async ({
    imageUrl, name, 
  } : CreateCategorySchemaServer) => {
     const slug = slugify(name, { lower: true});

     const { data, error } = await supabase.from('category').insert({
      name, imageUrl, slug,
     });

     if(error) throw new Error(`Error creating category: ${error.message}`);
     return data;
  };