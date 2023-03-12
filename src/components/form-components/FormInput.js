import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";

export const FormInput = ({	label, name, type, formOptions,	errors }) => {
	const { register } = useFormContext();

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
					<input
						type={`${type ? type : "text"}`}
						{...register(name ? name : "", formOptions)}
						className={`border border-solid rounded-sm ring:0 focus:ring-0 focus:outline-none border-gray-700 text-gray-500 text-normal py-1 h-8 px-2 text-sm w-full flex items-center`}
					/>
				</>
			</div>
			<ErrorMessage name={errors} />
		</>
	);
};