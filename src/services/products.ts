import {createClient} from "@/utils/supabase/server";

export const getProducts = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    console.error(error);
  }
  return data;
};

export const getProductsWithPrices = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*, prices(*)");
  if (error) {
    console.error(error);
  }
  return data;
};