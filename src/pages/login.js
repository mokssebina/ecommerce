import React,{ useContext } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormInput } from '../components/form-components/FormInput';
import SubmitButton from '../components/form-components/SubmitButton';
import { AuthContext } from '../context/AuthContext';
import { HOME, SIGN_UP } from '../utils/constant/routesConstants';
import { loginSchema } from '../validation/loginValidation';
import { toast } from "react-hot-toast";
import { withPublic } from '../components/protected-route';



function Login() {


  const { user, logIn } = useContext(AuthContext);
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
      
        await logIn(data.email, data.password);
        toast.success("Successfully logged in!", { id: toastId });
        await router.push(HOME);

    } catch (error) {
        toast.error(error.message, { id: toastId });
        console.log("login error: ",error.message)
    }
};

  return (
    <div className='w-full bg-white pt-14 overflow-y-hidden md:overflow-y-hidden lg:overflow-y-hidden xl:overflow-y-hidden'>
     <h2 className="px-12 mt-4 mb-6 text-center text-2xl font-semibold text-amazon_blue">Log In</h2>
     <main className='grid grid-flow-row-dense md:grid-cols-2 w-11/12 mx-auto bg-white'>
      <div className=" w-full"> 
       <div className="sign-up-form container w-full md:w-10/12 lg:w-8/12 px-2 mx-auto mb-6">
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

                <FormInput
                label="Password"
                name="password"
                type="password"
                formOptions={loginSchema.fields.password}
                errors={errors.password}
                />
                
                <SubmitButton buttonText={"Sign In"} />

            </form>
        </FormProvider>
       </div>
      </div> 
      <div className=" w-full border-l-0 border-t-2 border-amazon_blue md:h-full md:border-t-0 md:border-l-2 md:border-amazon_blue">
        <div className="sign-up-form text-center container md:h-full px-2 pt-8 pb-10 mx-auto sm:w-96 mb-10">
         <div className="relative w-full md:my-20 pt-8 pb-8 items-center justify-center align-middle"> 
          <p className="text-amazon_blue text-lg">
            Sign up
          </p> 
          <p className="mt-2 text-sm text-center text-amazon_blue-light hover:text-blue-900 cursor-pointer"
              onClick={() => router.push(SIGN_UP)}   
          >
            Don't have an account yet? Click here to Sign up.
          </p>
         </div>
       </div>
      </div>
     </main> 
    </div>
  )
}

export default withPublic(Login)