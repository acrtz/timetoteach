import { createClient } from "@/utils/supabase/server";

export async function getSubscriptions(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*, price: prices(*, products(*))")
    .eq("user_id", userId)
    .order("created", { ascending: false });

  return { data, error };
}
