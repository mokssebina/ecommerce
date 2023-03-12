import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../components/form-components/FormInput";
import SubmitButton from "../components/form-components/SubmitButton";
import { useAuth } from "../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { signupSchema } from "../validation/signupValidation";
import { useRouter } from "next/router";
import { HOME, LOGIN } from "../utils/constant/routesConstants";
import { onSnapshot, doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function SignupForm() {

    const { signUp, user } = useAuth();
    const router = useRouter();

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

        await signUp(data.email, data.password)
        .then((userCredentials) => {
            const payload = {
                name: data.displayName,
                email: data.email,
                displayPicture: '',
                account: "customer",
                userId: userCredentials.user.uid,
                status: null
            }

            console.log("payload: ",payload)

            let docRef = doc(db, "users", `${userCredentials.user.uid}`);

            const postRef = setDoc(docRef, payload)

            console.log("Doc ID")
            console.log("User is created: ",postRef)
        });

        console.log("User is created")
  
        toast.success("Successfully signed up!", { id: toastId });
        router.push(HOME);
         
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
             label="Your name"
             name="displayName"
             type="text"
             formOptions={signupSchema.fields.displayName}
             errors={errors.displayName}
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