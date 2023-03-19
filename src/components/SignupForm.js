import React, { useState, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../components/form-components/FormInput";
import SubmitButton from "../components/form-components/SubmitButton";
import { AuthContext } from "../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { signupSchema } from "../validation/signupValidation";
import { useRouter } from "next/router";
//import { HOME, LOGIN } from "../utils/constant/routesConstants";
import { onSnapshot, doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function SignupForm() {

    const { signUp, user } = useContext(AuthContext)

    
    const displayPicture = "";
    const account = "customer";
    const status = ""

    const methods = useForm({ mode: "onBlur", resolver: yupResolver(signupSchema) });

    const {
      handleSubmit,
      formState: { errors },
    } = methods;

  
    const onSubmit = async (data) => {

		  const toastId = toast.loading("Signing up...");
      console.log("signup started")
    
      try {
        console.log("sign up started")

        await signUp(data.firstName, data.lastName, data.email, data.password, displayPicture, account, status)

        console.log("User is created")
        console.log("user details: ",user)
  
        toast.success("Successfully signed up!", { id: toastId });
         
      } catch (error) {
        toast.error(error.message, { id: toastId });
        console.log("error: ",error.message)
      }

	};

  return (
         <FormProvider {...methods}>
          <form
           action=""
           className="w-11/12 mx-auto pb-12"
           onSubmit={handleSubmit(onSubmit)}>

            <FormInput
             label="Your First Name"
             name="firstName"
             type="text"
             formOptions={signupSchema.fields.firstName}
             errors={errors.firstName}
            />

            <FormInput
             label="Your Last Name"
             name="lastName"
             type="text"
             formOptions={signupSchema.fields.lastName}
             errors={errors.lastName}
            />

             <FormInput
              label="Email"
              name="email"
              type="email"
              formOptions={signupSchema.fields.email}
              errors={errors.email}
             />

              <FormInput
               label="Password"
               name="password"
               type="password"
               formOptions={signupSchema.fields.password}
               errors={errors.password}
              />
              {/*
              <FormInput
               label="Confirm Password"
               name="confirm_password"
               type="password"
               formOptions={signupSchema.fields.confirm_password}
               errors={errors.confirm_password}
              />
              */}              
              <SubmitButton buttonText={"Sign up"} />
          </form>
         </FormProvider>   
  )
}

export default SignupForm