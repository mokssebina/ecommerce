import React, { useContext } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../components/form-components/FormInput";
import { PasswordInput } from './form-components/PasswordInput';
import { FormDropdown } from './form-components/FormDropdown';
import SubmitButton from "../components/form-components/SubmitButton";
import { AuthContext } from "../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { sellerSignupSchema } from '../validation/sellerSignupValidation';
import { useRouter } from "next/router";
import { HOME, LOGIN } from "../utils/constant/routesConstants";
import { onSnapshot, doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { ThreeCircles } from  'react-loader-spinner';



function MerchantSignupForm(props) {

    const { merchantSignUp, user } = useContext(AuthContext)
    const router = useRouter();

    const displayPicture = "";
    const account = "service-provider";
    const status = "pending";

    const services = [
      {key:1, value: "agriculture", item: "Agricultural Services"},
      {key:2, value: "construction", item: "Construction"},
      {key:3, value: "engineering", item: "Engineering"},
      {key:4, value: "farming", item: "Farming"},
      {key:5, value: "food", item: "Food/Produce"},
      {key:6, value: "ict", item: "IT Services"},
      {key:7, value: "medical", item: "Medical Services"},
      {key:8, value: "retail", item: "Retail"},
      {key:9, value: "supplier", item: "Supplier"},
    ];

    const methods = useForm({ mode: "onBlur", resolver: yupResolver(sellerSignupSchema) });

    const {
      handleSubmit,
      formState: { errors },
    } = methods;

   
  const onSubmit = async (data) => {

    const toastId = toast.loading("Signing up...");
    console.log("seller signup started")
    props.showSignUpLoader
  
    try {
      console.log("merchant sign up started")

      await merchantSignUp(data.sellerCompanyName, data.sellerEmail, data.sellerPassword, displayPicture, account, status)
      
        console.log("Merchant user is created")
        props.hideSignUpLoader
        toast.success("Successfully signed up!", { id: toastId });
      
    } catch (error) {
      toast.error(error.message, { id: toastId });
      console.log("error: ",error.message)
      props.hideSignUpLoader
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

            <FormDropdown
             label="Services"
             name="sellerService"
             options={services} 
             formOptions={sellerSignupSchema.fields.sellerService}
             errors={errors.sellerService}
            />

            <PasswordInput
             label="Password"
             name="sellerPassword"
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