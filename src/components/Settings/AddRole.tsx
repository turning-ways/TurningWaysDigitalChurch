import { useState } from "react";
import { HiMiniPlusCircle } from "react-icons/hi2";
import Modal from "../../ui/Modal/Modal";

const AddRole = () => {
	const [openRoleForm, setOpenRoleForm] = useState<boolean>(false);
	return (
		<section>
			<button
				className="rounded-[15px] border border-[#17275B] px-5 py-3 space-x-2 text-[#17275B] flex items-center my-10 md:my-0"
				onClick={(e) => {
					e.preventDefault();
					setOpenRoleForm(!openRoleForm);
				}}>
				<HiMiniPlusCircle className="text-[21px]" />
				<p className="font-medium">Add Role</p>
			</button>
			{openRoleForm && (
				<Modal onClose={() => setOpenRoleForm(!openRoleForm)} className="">
					<section className="bg-white w-[400px] sm:w-[500px] lg:w-[791px] h-[700px] lg:py-10 px-10 overflow-scroll scrollbar-hide">
						<header className="text-[24px] font-azoSemiBold">Add Role</header>
						<form className="text-[#5C5C5C] space-y-5 flex flex-col">
							{fields.map((item, index) => (
								<div className="flex flex-col" key={index}>
									<label htmlFor="" className="text-[18px]">
										{item.name}
									</label>
									<input
										type="text"
										className="border-[#D9D9D9] border outline-none rounded-lg px-4 py-2"
									/>
								</div>
							))}
							<section className="flex lg:space-x-6 space-y-6 lg:space-y-0 flex-col lg:flex-row">
								<article className="border border-[#8F9490] w-full ">
									<header className="border-b border-b-[#8F9490] px-6 py-2 font-azoSemiBold">
										Create
									</header>
									<ul className="px-6 py-4 space-y-4">
										{create.map((item, index) => (
											<li className="flex space-x-2" key={index}>
												<input type="checkbox" />
												<p>{item.value}</p>
											</li>
										))}
									</ul>
								</article>
								<article
									className="border border-[#8F9490] w-full "
									//   style={{ marginLeft: 0 }}ee
								>
									<header className="border-b border-b-[#8F9490] px-6 py-2 font-azoSemiBold">
										Edit
									</header>
									<ul className="px-6 py-4 space-y-4">
										{edit.map((item, index) => (
											<li className="flex space-x-2" key={index}>
												<input type="checkbox" />
												<p>{item.value}</p>
											</li>
										))}
									</ul>
								</article>
								<article
									className="border border-[#8F9490] w-full "
									//   style={{ marginLeft: 0 }}
								>
									<header className="border-b border-b-[#8F9490] px-6 py-2 font-azoSemiBold">
										View
									</header>
									<ul className="px-6 py-4 space-y-4">
										{view.map((item, index) => (
											<li className="flex space-x-2" key={index}>
												<input type="checkbox" />
												<p>{item.value}</p>
											</li>
										))}
									</ul>
								</article>
							</section>
							<div className="bg-white py-3 lg:self-end space-x-6 sticky bottom-0 flex ">
								<button
									className="border border-[#555454] px-[25px] py-2 rounded-lg w-full lg:w-fit"
									onClick={() => setOpenRoleForm(!openRoleForm)}>
									Cancel
								</button>
								<button className="border border-[#555454] px-[25px] text-white py-2 rounded-lg bg-[#0F1D48] w-full lg:w-fit">
									Create
								</button>
							</div>
						</form>
					</section>
				</Modal>
			)}
		</section>
	);
};

export default AddRole;

const fields = [{ name: "Role Name" }, { name: "Role Description" }];
const create = [
	{ value: "Create Forms" },
	{ value: "Create Programs" },
	{ value: "Create New Users" },
	{ value: "Create Roles" },
];
const edit = [
	{ value: "Edit Forms" },
	{ value: "Edit Programs" },
	{ value: "Edit New Users" },
	{ value: "Edit Roles" },
	{ value: "Edit Questions" },
];
const view = [
	{ value: "View Forms" },
	{ value: "View Programs" },
	{ value: "View New Users" },
	{ value: "View Roles" },
	{ value: "View Questions" },
];
