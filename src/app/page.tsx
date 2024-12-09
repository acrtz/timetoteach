"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
export default function Page() {
  const form = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <main>
      <Card className="w-[700px] max-w-[95vw] mt-12 mx-auto">
        <CardHeader>
          <CardTitle>Create Assignment or Assessment</CardTitle>
          <CardDescription>
            Create a new assignment or assessment for your students.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the assignment or assessment in detail."
                        className="min-h-40"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="block mx-auto">
                Generate Document
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
