'use server'
import { createClient } from "@/utils/supabase/server";

export const getPrice = async (priceId: string) => {
  const supabase = await createClient();

  const { data: price } = await supabase
    .from("prices")
    .select("*")
    .match({ id: priceId })
    .single();
  
  return price;
}
