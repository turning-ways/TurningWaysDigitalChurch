import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthContainer from "../../ui/Container/AuthContainer";
import Header from "../../ui/Heading/Header";
import PasswordInput from "../../ui/Input/PasswordInput";
import Input from "../../ui/Input/Input";
import NextButton from "../../ui/Button/NextButton";
import TermsOfServiceAndPrivacyPolicy from "../../components/Register/TermsOfServiceAndPrivacyPolicy";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserDetailsStore } from "../../stores/user";
import { notify, useInviteMember } from "../../hooks/useAuthData";
import Loading from "../../components/Loading";
import axios from "axios";

const schema = z
	.object({
		email: z.string().email({ message: "Please enter a valid email" }),
		password: z.string().min(8, { message: "Password should be at least 8 characters long" }),
		passwordConfirm: z
			.string()
			.min(8, { message: "Password should be at least 8 characters long" }),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Passwords don't match",
		path: ["passwordConfirm"],
	});

type FormData = z.infer<typeof schema>;

const Invite: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});
	const location = useLocation();
	const navigate = useNavigate();
	const [id, setId] = useState<string>("");
	const { setEmail } = useUserDetailsStore();
	const [checked, setChecked] = useState<boolean>(false);
	const [church, setChurch] = useState<string>("turningways");
	const { mutate, isPending } = useInviteMember(id);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const searchParams = new URLSearchParams(location.search);
				const id = searchParams.get("id") || "";
				const key = searchParams.get("key");
				const church = searchParams.get("church") || "turningways";

				setId(id);
				setChurch(church);

				if (!id || !key) {
					throw new Error("Missing id or key");
				}

				await axios.get(`https://turningways.onrender.com/api/v1/users/invite?id=${id}&key=${key}`);
			} catch (error: any) {
				console.error("Error fetching data:", error);
				navigate("/");
				if (error.message === "Missing id or key") {
					return notify("Missing id or key");
				}
				notify("Error occurred while fetching invite data");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [location.search, navigate]);

	if (loading) {
		return <Loading />;
	}

	const onSubmit = (data: FormData) => {
		const { email, password } = data;
		setEmail(email);
		if (checked) {
			mutate({ email, password });
		} else {
			notify("Please agree to our terms of service and privacy policy");
		}
	};

	return (
		<AuthContainer center="sm:items-center md:pt-0">
			<form onSubmit={handleSubmit(onSubmit)} className="bg-white py-10">
				<div className="mb-4">
					<Header>Sign Up</Header>
					<p className="text-[#949995] text-base lg:text-[18px]">
						We warmly invite you to join {church} database
					</p>
				</div>
				<Input
					heading="Email"
					name="email"
					register={register}
					placeholder="temidireowoeye@gmail.com"
					formError={errors.email?.message}
				/>
				<PasswordInput
					heading="Password"
					name="password"
					register={register}
					placeholder="********"
					formError={errors.password?.message}
				/>
				<PasswordInput
					heading="Re-Enter Password"
					name="passwordConfirm"
					register={register}
					placeholder="*********"
					formError={errors.passwordConfirm?.message}
				/>
				<div className="text-[#718096] flex items-center space-x-2 my-8">
					<input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
					<TermsOfServiceAndPrivacyPolicy />
				</div>
				<NextButton text="Sign up" isPending={isPending} />
			</form>
		</AuthContainer>
	);
};

export default Invite;
