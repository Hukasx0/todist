"use client";

import { z } from "zod";
import { Button } from "./ui/button";
import { Credenza, CredenzaBody, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "./ui/credenza";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import React from "react";
import { Plus } from "lucide-react";

import { api } from "@/trpc/react";
import { useTasks } from "@/context/tasks-context";

const formSchema = z.object({
    content: z.string().min(1, { message: "Content is required" }).max(128, { message: "Content is too long" }),

})

export default function AddTodo() {
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const { addTask } = useTasks();

  function onSubmit(values: z.infer<typeof formSchema>) {
    addTask({ content: values.content, columnId: "todo" })
      .then(() => {
        setIsOpen(false);
      });
    form.reset();
  }

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full flex justify-center p-5">
      <Credenza open={isOpen} onOpenChange={setIsOpen}>
        <CredenzaTrigger asChild>
          <Button variant={"secondary"} onClick={handleOpen}>
            Add task <Plus className="pl-2 w-6 h-6" />
          </Button>
        </CredenzaTrigger>
        <CredenzaContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CredenzaHeader>
                  <CredenzaTitle>Add new task</CredenzaTitle>
                  <CredenzaDescription>Create a new task</CredenzaDescription>
                </CredenzaHeader>
                <CredenzaBody>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Input placeholder="Make a coffee ☕" {...field} />
                        </FormControl>
                        <FormDescription>
                          The content of the task
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CredenzaBody>
                <CredenzaFooter>
                  <Button type="submit" variant={"default"}>Add</Button>
                  <CredenzaClose asChild>
                    <Button variant={"outline"}>Close</Button>
                  </CredenzaClose>
                </CredenzaFooter>
              </form>
            </Form>
        </CredenzaContent>
      </Credenza>
    </div>
  );
}
