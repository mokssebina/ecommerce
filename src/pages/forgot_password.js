import React,{ useContext } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormInput } from '../components/form-components/FormInput';
import SubmitButton from '../components/form-components/SubmitButton';
import { AuthContext } from '../context/AuthContext';
import { LOGIN } from '../utils/constant/routesConstants';
import { loginSchema } from '../validation/loginValidation';
import { toast } from "react-hot-toast";
import { withPublic } from '../components/protected-route';



function ForgotPassword() {


  const { user, logIn, resetPassword } = useContext(AuthContext);
  const router = useRouter();  

  const methods = useForm({ mode: "onBlur", resolver: yupResolver(loginSchema) });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    const toastId = toast.loading("Logging in...");
    try {

        console.log("login in started")
      
        await resetPassword(data.email).then(() => {
            data.email = ""
        })
        toast.success("An email has been sent to you. You will find the link to reset your password.", { id: toastId });
        await router.push(LOGIN);

    } catch (error) {
        toast.error(error.message, { id: toastId });
        console.log("login error: ",error.message)
    }
 };
  

  return (
    <div className='w-full bg-white pt-14 overflow-y-hidden md:overflow-y-hidden lg:overflow-y-hidden xl:overflow-y-hidden'>
     <h2 className="px-12 mt-4 mb-6 text-center text-2xl font-semibold text-amazon_blue">Reset Password</h2>

     <main className='w-8/12 mx-auto bg-white'>
      <div className=" w-full"> 
       <div className="sign-up-form container w-full md:w-8/12 lg:w-6/12 px-2 mx-auto mb-6">
        <FormProvider {...methods}>
            <form
              action=""
              className="w-11/12 mx-auto pb-6"
              onSubmit={handleSubmit(onSubmit)}>

                <FormInput
                label="Email"
                name="email"
                type="email"
                formOptions={loginSchema.fields.email}
                errors={errors.email}
                />

                <SubmitButton buttonText={"Send Email"} />

            </form>
        </FormProvider>
       </div>
      </div> 
      
     </main> 
    </div>
  )
}

export default withPublic(ForgotPassword)