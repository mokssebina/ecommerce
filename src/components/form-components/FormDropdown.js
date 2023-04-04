import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";
//import { Select, Option } from "@material-tailwind/react";


export const FormDropdown = ({	label, name, formOptions, options, rest, errors }) => {
	const { register } = useFormContext();
    console.log("array: ",options)

	return (
		<>
			<div className="mt-2">
				{label && (
					<div className="flex items-center justify-between">
						<label htmlFor="" className="block mb-2 font-sans text-sm text-blue-900">
							{label}
						</label>
					</div>
				)}
				<>
                    <select 
                        {...register(name ? name : "", formOptions)} {...rest}
                        className={`border border-solid rounded-sm ring:0 focus:ring-0 focus:outline-none border-gray-700 text-gray-500 text-normal py-1 h-8 px-2 text-sm w-full flex items-center`}
                    >
                      {options.map((service) => (
                        <option className="w-full flex text-sm text-gray-900" value={service.value}>{service.item}</option>
                      ))}                          
                    </select>
				</>
			</div>
			<ErrorMessage name={errors} />
		</>
	);
};