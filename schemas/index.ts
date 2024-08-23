import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1,
        {message: "Password is required!"}
    )
})

const phoneRegex = new RegExp(
    /^0[7-9]{1}[0-1]{1}[0-9]{8}$/
  );

export const RegisterSchema = z.object({
    firstname: z.string().min(1,{
        message: "First Name is required"
    }),
    lastname: z.string().min(1,{
        message: "Last Name is required"
    }),
    phonenumber: z.string().regex(phoneRegex, 'Invalid Phone Number!').min(11, {
        message: "Must be a valid phone Number"
    }).max(11, {
        message: "Must be a valid phone Number"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6,
        {message: "Minimum 6 characters required"}
    )
})