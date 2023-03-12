import React from "react";

const SubmitButton = (props) => {
	return (
		<div className="flex justify-center pt-6">
			<button
				type="submit"
				className={`w-full h-8 text-center bg-amazon_blue border-2 rounded-md hover:shadow-lg hover:bg-blue-800 text-sm transition`}
			>
				<p className="capitalize text-white font-normal">{props.buttonText}</p>
			</button>
		</div>
	);
};

export default SubmitButton;