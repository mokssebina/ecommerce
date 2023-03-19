import React, { useContext } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../components/form-components/FormInput";
import SubmitButton from "../components/form-components/SubmitButton";
import { AuthContext } from "../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { sellerSignupSchema } from '../validation/sellerSignupValidation';
import { useRouter } from "next/router";
import { HOME, LOGIN } from "../utils/constant/routesConstants";
import { onSnapshot, doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

function MerchantSignupForm() {

    const { merchantSignUp, user } = useContext(AuthContext)
    const router = useRouter();

    const displayPicture = "";
    const account = "merchant";
    const status = "pending"

    const methods = useForm({ mode: "onBlur", resolver: yupResolver(sellerSignupSchema) });

    const {
      handleSubmit,
      formState: { errors },
    } = methods;

   
  const onSubmit = async (data) => {

    const toastId = toast.loading("Signing up...");
    console.log("seller signup started")
  
    try {
      console.log("merchant sign up started")

      await merchantSignUp(data.sellerCompanyName, data.sellerEmail, data.sellerPassword, displayPicture, account, status)
      
        console.log("Merchant user is created")

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
             label="Company name"
             name="sellerCompanyName"
             type="text"
             formOptions={sellerSignupSchema.fields.sellerCompanyName}
             errors={errors.sellerCompanyName}
            />

            <FormInput
             label="Email"
             name="sellerEmail"
             type="email"
             formOptions={sellerSignupSchema.fields.sellerEmail}
             errors={errors.sellerEmail}
            />

            <FormInput
             label="Password"
             name="sellerPassword"
             type="password"
             formOptions={sellerSignupSchema.fields.sellerPassword}
             errors={errors.sellerPassword}
            />
            {/*
            <FormInput
             label="Confirm Password"
             name="sellerConfirm_password"
             type="password"
             formOptions={sellerSignupSchema.fields.sellerConfirm_password}
             errors={errors.sellerConfirm_password}
            />
            */}                    
            <SubmitButton buttonText={"Sign up"} />

          </form>
         </FormProvider>   
        
  )
}

export default MerchantSignupForm