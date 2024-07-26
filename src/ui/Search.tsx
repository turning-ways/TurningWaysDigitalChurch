import React, { useEffect, useRef, useState, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { useChurchIdStore } from "../stores/churchId";

interface SearchProps {
	size: string;
}

interface Member {
	firstName: string;
	id: string;
	lastName: string;
}

interface Contact {
	firstName: string;
	lastName: string;
	id: string;
}

interface SearchResult {
	_id: string;
	contacts: (Member | Contact)[];
}

const Search: React.FC<SearchProps> = ({ size }) => {
	const navigate = useNavigate();
	const churchId = useChurchIdStore((state) => state.churchId);
	const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
	const [value, setValue] = useState<string>("");
	const [showDropdown, setShowDropdown] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const fetchData = useCallback(
		async (signal: AbortSignal) => {
			if (value.length > 2) {
				setLoading(true);
				try {
					const response = await axios.get(
						`/api/v1/churches/${churchId}/contacts?search=${value}`,
						{
							signal,
						}
					);
					const data: SearchResult[] = response.data.data.contacts || [];
					setSearchResult(Array.isArray(data) ? data : []);
				} catch (error) {
					console.error("Error fetching search results:", error);
				} finally {
					setLoading(false);
				}
			} else {
				setSearchResult([]);
			}
		},
		[value, churchId]
	);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		fetchData(signal);

		return () => {
			abortController.abort();
		};
	}, [fetchData]);

	const handleClickOutside = useCallback((event: Event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
			setShowDropdown(false);
		}
	}, []);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handleClickOutside]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		setShowDropdown(true);
	};

	const handleDropdownBlur = () => {
		setTimeout(() => setShowDropdown(false), 100); // Delay to handle clicks on dropdown items
	};

	const getFilteredContacts = (type: string) => {
		const result = searchResult?.find((result) => result._id === type);
		return (
			result?.contacts?.filter(
				(contact: Member | Contact) =>
					contact.firstName.toLowerCase().includes(value.toLowerCase()) ||
					contact.lastName.toLowerCase().includes(value.toLowerCase())
			) || []
		);
	};

	const filteredMembers = getFilteredContacts("member");
	const filteredContacts = getFilteredContacts("contact");

	return (
		<div
			className={`rounded-lg bg-[#F2F0F0] py-2 px-3 gap-x-3 items-center h-fit w-full lg:w-[300px] relative ${size}`}
			ref={dropdownRef}>
			<CiSearch style={{ fontSize: "29px", color: "#6D6C6C" }} />
			<input
				type="text"
				placeholder="Search"
				value={value}
				className="bg-transparent outline-none placeholder-[#6D6C6C] w-full"
				onChange={handleInputChange}
				onFocus={() => setShowDropdown(true)}
				onBlur={handleDropdownBlur}
			/>
			{loading && (
				<div className="absolute top-14 left-0 w-full bg-white shadow-2xl rounded-md z-50 border border-gray-200 max-h-40 flex items-center justify-center">
					<p className="text-gray-500">Loading...</p>
				</div>
			)}
			{showDropdown && !loading && (
				<section className="absolute top-14 left-0 w-full shadow-2xl bg-white rounded-md z-50 border border-gray-200 max-h-40 overflow-y-scroll">
					{filteredMembers.length > 0 && (
						<>
							<div className="px-4 py-2 border-b font-azoBold text-sm">MEMBERS</div>
							<ul>
								{filteredMembers.map((member: Member) => (
									<li
										key={member.id}
										className="px-4 py-2 hover:bg-[#f2f2f2] cursor-pointer"
										onMouseDown={(e) => {
											e.preventDefault();
											navigate(`/admin/directory/member/personal-information?id=${member.id}`);
											setShowDropdown(false);
										}}>
										{member.firstName} {member.lastName}
									</li>
								))}
							</ul>
						</>
					)}
					{filteredContacts.length > 0 && (
						<>
							<div className="px-4 border-y py-2 font-azoBold text-sm">CONTACTS</div>
							<ul>
								{filteredContacts.map((contact: Contact) => (
									<li
										key={contact.id}
										className="px-4 py-2 hover:bg-[#f2f2f2] cursor-pointer"
										onMouseDown={(e) => {
											e.preventDefault();
											navigate(`/admin/contacts/${contact.id}`);
											setShowDropdown(false);
										}}>
										{contact.firstName} {contact.lastName}
									</li>
								))}
							</ul>
						</>
					)}
					{filteredMembers.length === 0 && filteredContacts.length === 0 && !loading && (
						<div className="px-4 py-2 text-center text-gray-500">No results found</div>
					)}
				</section>
			)}
		</div>
	);
};

export default Search;
