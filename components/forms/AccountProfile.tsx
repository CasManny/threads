"use client";

import { IAccountProps } from "@/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userValidation } from "@/lib/validations/user";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { ChangeEvent } from "react";
import { Textarea } from "../ui/textarea";

const AccountProfile = ({ user, btnTitle }: IAccountProps) => {
  const form = useForm<z.infer<typeof userValidation>>({
    resolver: zodResolver(userValidation),
    defaultValues: {
      profile_photo: "",
      name: "",
      username: "",
      bio: "",
    },
  });

  const handleImage = (
    e: ChangeEvent,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
  };

  function onSubmit(values: z.infer<typeof userValidation>) {
    console.log(values);
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex-col flex justify-start gap-10"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="account-form_image-label">
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt="profile photo"
                      width={96}
                      height={96}
                      priority
                      className="rounded-full object-contain"
                    />
                  ) : (
                    <Image
                      src="/assets/profile.svg"
                      alt="profile"
                      width={24}
                      height={24}
                      className="rounded-full object-contain"
                    />
                  )}
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="upload a photo"
                    className="account-form_image-input"
                    onChange={(e) => handleImage(e, field.onChange)}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2">Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2">username</FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Input
                    type="text"
                    placeholder="Enter username"
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2">Bio</FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Textarea 
                    rows={10}
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary-500">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default AccountProfile;
