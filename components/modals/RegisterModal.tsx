import { useCallback, useState } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import * as Api from "@/api";
import Modal from "./Modal";
import { Input } from "../ui/Input";
import { toast } from "react-toastify";
import { setCookie } from "nookies";
import { RegisterFormDTO } from "@/api/dto/auth.dto";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup";
import { Label } from "../ui/Label";

import { format } from "date-fns";

import { cn } from "@/lib/utils";

const RegisterModal = () => {
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [nickName, setNickName] = useState("");
	const [fullName, setFullName] = useState("");
	const [activity, setActivity] = useState("");
	const [gender, setGender] = useState("male");
	const [dateOfBirth, setDateOfBirth] = useState<Date | undefined> ();

	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (values: RegisterFormDTO) => {
		try {
			if (
				!fullName.trim() ||
				!email.trim() ||
				!password.trim() ||
				!nickName.trim() ||
				!activity.trim() ||
				!gender.trim() ||
				!dateOfBirth
			) {
				toast.error("Fill all the fields");
				return;
			}

			// Convert dateOfBirth to Date object
			const parsedDateOfBirth = dateOfBirth ? new Date(dateOfBirth) : undefined;

			setIsLoading(true);
			const { token } = await Api.auth.register({
				...values,
				dateOfBirth: parsedDateOfBirth,
			});
			toast.success("Account Created!");
			setCookie(null, "_token", token, {
				path: "/",
			});
			setIsLoading(false);
			location.href = "/home/links";
		} catch (err) {
			setIsLoading(false);
			console.warn("RegisterForm", err);
			toast.error("Error");
		}
	};
	const values = {
		email,
		password,
		fullName,
		nickName,
		activity,
		isPrime: false,
		bio: "There is no bio yet",
		gender,
		dateOfBirth,
		avatar: ""
	};

	const onToggle = useCallback(() => {
		loginModal.onOpen();
		registerModal.onClose();
	}, [loginModal, registerModal]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Input
				placeholder="Your Name"
				type="text"
				onChange={(e) => setFullName(e.target.value)}
				value={fullName}
				disabled={isLoading}
			/>
			<Input
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				disabled={isLoading}
			/>
			<Input
				placeholder="Password"
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				disabled={isLoading}
			/>
			<Input
				placeholder="Come up with nickname"
				type="text"
				onChange={(e) => setNickName(e.target.value)}
				value={nickName}
				disabled={isLoading}
			/>
			<Input
				placeholder="What's your activity"
				type="text"
				onChange={(e) => setActivity(e.target.value)}
				value={activity}
				disabled={isLoading}
			/>
	
			<Input
				type="date"
				value={dateOfBirth ? format(dateOfBirth, "yyyy-MM-dd") : ""}
				onChange={(e) =>
					setDateOfBirth(e.target.value ? new Date(e.target.value) : undefined)
				}
				disabled={isLoading}
				className={cn(
					"w-[280px] justify-start text-left font-normal",
					!dateOfBirth && "text-muted-foreground"
				)}
			/>
			
			<RadioGroup
				onValueChange={(value) => setGender(value)}
				defaultValue="male"
				className="flex items-center py-5"
			>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="male" id="r1" />
					<Label className="text-slate-400" htmlFor="r1">
						Male
					</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="female" id="r1" />
					<Label className="text-slate-400" htmlFor="r1">
						Female
					</Label>
				</div>
			</RadioGroup>
		</div>
	);

	const footerContent = (
		<div className="text-neutral-400 text-center mt-4">
			<p>
				Already have an Account?
				<span
					onClick={onToggle}
					className="
            text-accent
            cursor-pointer 
            hover:underline
          "
				>
					{" "}
					Sign In
				</span>
			</p>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title="Create an account"
			actionLabel="Sign up"
			onClose={registerModal.onClose}
			onSubmit={() => onSubmit(values)}
			body={bodyContent}
			footer={footerContent}
			buttonLoading={isLoading}
		/>
	);
};

export default RegisterModal;
