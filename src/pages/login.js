import React,{ useContext, useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormInput } from '../components/form-components/FormInput';
import { PasswordInput } from '../components/form-components/PasswordInput';
import SubmitButton from '../components/form-components/SubmitButton';
import { AuthContext } from '../context/AuthContext';
import { HOME, SIGN_UP, FORGOT_PASSWORD } from '../utils/constant/routesConstants';
import { loginSchema } from '../validation/loginValidation';
import { withPublic } from '../components/protected-route';
import { Oval } from  'react-loader-spinner'
import { collection, getDocs, query, where, onSnapshot, doc } from "firebase/firestore";
import { db } from '../config/firebase';
import { toast, Toaster } from "react-hot-toast";



function Login() {

  document.body.style.backgroundColor = "#ffffff";


  const [hideLoading, setHideLoading] = useState(true);
  let userData = {}

  const { user, logIn } = useContext(AuthContext);
  const router = useRouter();  

  const methods = useForm({ mode: "onBlur", resolver: yupResolver(loginSchema) });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  
  
  const getAccountDetails = async (data) => {

    setHideLoading(false)

    console.log("log in commences")

    console.log("user email: ",data.email)

    const userDoc = query(collection(db, `users`), where("email", "==", `${data.email}`))
    const userRefSnapshot = await getDocs(userDoc);

    userRefSnapshot.forEach((doc) => {

      userData = {user: doc.data()}
      /*
      setUserData(userData => ({
        ...userData,
        ...updatedValue
      }))
      */

      console.log("doc data: ",doc.data())
    })

    console.log("user data doc: ",userData)

    
    if(userData.user.account === "customer"){
      const toastId = toast.loading("Logging in...");
      try {
  
          console.log("login in started")
        
          await logIn(data.email, data.password);
          await router.push(HOME);
          setHideLoading(true)
          toast.success("Successfully logged in!", { id: toastId });
  
      } catch (error) {
  
          toast.error(error, { id: toastId });
          console.log("login error: ",error.message)
          setHideLoading(true)
      }
    }else{
      setHideLoading(true)
      toast.error("Log in as customer")
    }

  }

  return (
    <>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    <div hidden={hideLoading} className="relative w-20 h-20 mx-auto my-4">
      <Oval
       height={80}
       width={80}
       color="#7e22ce"
       wrapperStyle={{}}
       wrapperClass=""
       visible={true}
       ariaLabel='oval-loading'
       secondaryColor="#7e22ce"
       strokeWidth={2}
       strokeWidthSecondary={2}
      />
    </div> 
    <div className='w-full bg-white pt-14 overflow-y-hidden md:overflow-y-hidden lg:overflow-y-hidden xl:overflow-y-hidden'>
     <h2 className="px-12 mt-4 mb-6 text-center text-2xl font-semibold text-amazon_blue">Log In</h2>
     <main className='grid grid-flow-row-dense md:grid-cols-2 w-11/12 mx-auto bg-white'>
      <div className=" w-full"> 
       <div className="sign-up-form container w-full md:w-10/12 lg:w-8/12 px-2 mx-auto mb-6">
        <FormProvider {...methods}>
            <form
              action=""
              className="w-11/12 mx-auto pb-6"
              onSubmit={handleSubmit(getAccountDetails)}>

                <FormInput
                label="Email"
                name="email"
                type="email"
                formOptions={loginSchema.fields.email}
                errors={errors.email}
                />

                <PasswordInput
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
          <p className="mt-6 text-sm text-center text-amazon_blue-light hover:text-blue-900 cursor-pointer"
              onClick={() => router.push(FORGOT_PASSWORD)}   
          >
            Forgot Password?
          </p>
         </div>
       </div>
      </div>
     </main> 
    </div>
    </>
  )
}

export default withPublic(Login)