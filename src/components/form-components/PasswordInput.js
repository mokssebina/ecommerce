import React,{ useState } from 'react'
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'


export const PasswordInput = ({	label, name, type, formOptions,	errors }) => {
	const { register } = useFormContext();

    const [show, setShow] = useState(false)


	return (
		<>
			<div className="mt-2">
				{label && (
					<div className="flex items-center justify-between">
						<label htmlFor="" className="block mb-2 font-sans text-sm text-gray-700">
							{label}
						</label>
					</div>
				)}
				<div className="rounded-md border border-solid border-gray-700 flex flex-row h-8 p-1">
					<input
						type={`${show? "text" : "password"}`}
						{...register(name ? name : "", formOptions)}
						className={`ring:0 focus:ring-0 focus:outline-none text-gray-500 text-normal h-full py-1 px-2 text-sm w-full flex items-center`}
					/>
                    
					<div onClick={() => setShow(!show)} className="text-gray-700 h-6 w-6 p-1">
                     {show?   
                      <EyeOffIcon className='w-4 h-4' />
                      :
                      <EyeIcon className='w-4 h-4' />
                     }
					</div>
				</div>
			</div>
			<ErrorMessage name={errors} />
		</>
	);
};