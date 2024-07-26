import React from "react";

const Loading: React.FC = () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="relative w-20 h-20">
				<div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full animate-ping"></div>
				<div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full animate-pulse"></div>
				<div className="absolute inset-0 bg-white rounded-full"></div>
			</div>
		</div>
	);
};

export default Loading;
