import { useCallback, useState } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import * as Api from "@/api";
import Modal from "./Modal";
import { Input } from "../ui/Input";
import { toast } from "react-toastify";
import { setCookie } from "nookies";
import { LoginFormDTO } from "@/api/dto/auth.dto";

const LoginModal = () => {
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (values: LoginFormDTO) => {
		try {
			if (!email.trim() || !password.trim()) {
				toast.error("Fill all the fields");
				return;
			}
			setIsLoading(true);
			const { token } = await Api.auth.login(values);

			toast.success(`Signed In!`);
			setCookie(null, "_token", token, {
				path: "/",
			});
			setIsLoading(false);
			location.href = "/home/links";
		} catch (err) {
			setIsLoading(false);
			toast.error("Error");
		}
	};
	const values = { email, password };

	const onToggle = useCallback(() => {
		loginModal.onClose();
		registerModal.onOpen();
	}, [loginModal, registerModal]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
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
		</div>
	);

	const footerContent = (
		<div className="text-neutral-400 text-center mt-4">
			<p>
				First time using Flux?
				<span
					onClick={onToggle}
					className="
            text-accent
            cursor-pointer 
            hover:underline
          "
				>
					{" "}
					Create an account
				</span>
			</p>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title="Login"
			actionLabel="Sign in"
			onClose={loginModal.onClose}
			onSubmit={() => onSubmit(values)}
			body={bodyContent}
			footer={footerContent}
			buttonLoading={isLoading}
		/>
	);
};

export default LoginModal;
