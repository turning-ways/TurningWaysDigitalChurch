import React, { ChangeEvent } from "react";
import { capitalize } from "../../../../utils/formatter";

interface InformationInputProps {
	text: string;
	value?: string;
	notCompulsory?: string;
	type?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string; // Added placeholder for improved UX
	error?: string; // Added error handling
}

const InformationInput: React.FC<InformationInputProps> = ({
	text,
	onChange,
	value,
	notCompulsory,
	type = "text", // Default type to "text"
	placeholder = "", // Default placeholder to empty string
	error = "", // Default error to empty string
}) => {
	return (
		<div className="space-y-1 mb-4 bg-white">
			<p className="text-[#727272]">
				{text} <span className="text-[#61BD74]">{notCompulsory || "*"}</span>
			</p>
			<div className={`border rounded-lg p-2 ${error ? "border-red-500" : "border-gray-300"}`}>
				<input
					type={type}
					className={`outline-none text-[#434343] text-lg w-full ${
						error ? "border-red-500" : "border-gray-300"
					}`}
					onChange={onChange}
					value={text === "Email" ? value?.toLowerCase() : capitalize(value || "")}
					placeholder={placeholder}
					aria-label={text}
					aria-required={notCompulsory ? "false" : "true"} // Improve accessibility
				/>
			</div>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>} {/* Show error message */}
		</div>
	);
};

export default InformationInput;
