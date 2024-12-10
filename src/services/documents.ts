"use server";
import { createClient } from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export const generateDocument = async (prompt: string) => {
  const supabase = await createClient();
  const {data, error} = await supabase.from("documents").insert({
    prompt,
    version: 1,
  })
  .select()
  .single();
  console.log({ data, error });
  if (error || !data) {
    console.error({ error });
    throw new Error("Failed to generate document");
  }
  redirect(`/document/${data.id}`);
};
