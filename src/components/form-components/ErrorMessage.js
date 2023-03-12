export const ErrorMessage = ({ name }) => {
	return (
		<>
		  <p className="text-red-500">{name?.message}</p>
		</>
	);
};
