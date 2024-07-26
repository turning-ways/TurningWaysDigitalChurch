import React from "react";

// props for rows and columns
interface TableShimmerSkeletonProps {
	rowsNum: number;
	colsNum: number;
}

const TableShimmerSkeleton: React.FC<TableShimmerSkeletonProps> = ({ rowsNum, colsNum }) => {
	const rows = Array(rowsNum).fill(0); // Adjust the number of rows as needed
	const mobileRows = Array(5).fill(0);
	const cols = Array(colsNum).fill(0); // Adjust the number of columns as needed

	return (
		<>
			<div className="overflow-x-auto hidden lg:block ">
				<table className="min-w-full bg-white">
					<thead>
						<tr className="bg-[#E8EDFF] text-left text-[#636363]">
							<th className="py-2 px-3">Name</th>
							<th className="py-2 px-3">Phone Number</th>
							<th className="py-2 px-3">Assigned To</th>
							<th className="py-2 px-3">Label</th>
							<th className="py-2 px-3">Status</th>
							<th className="py-2 px-3">Modified</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((_, rowIndex) => (
							<tr key={rowIndex} className="border-b text-[#636363]">
								{cols.map((_, colIndex) => (
									<td key={colIndex} className="py-2 px-3">
										<div className="shimmer h-6 rounded"></div>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="lg:hidden">
				{mobileRows.map((_, index) => (
					<div
						key={index}
						className="border-b border-[#BDBDBD] flex py-2 text-[#555454] px-3 justify-between items-center cursor-pointer">
						<div>
							<div className="shimmer h-4 w-32 mb-2 rounded"></div>
							<div className="shimmer h-4 w-24 rounded"></div>
						</div>
						<div className="shimmer h-6 w-6 rounded-full"></div>
					</div>
				))}
			</div>
		</>
	);
};

export default TableShimmerSkeleton;
