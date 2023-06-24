import React from "react";
import { Button } from "@/components/ui/Button";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";



const Preview = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	return (
		<div className="container">
			<div className="w-full h-[80vh]">
				<div className="w-full h-full flex flex-col items-center justify-center">
					<div className="text-center flex flex-col items-center justify-center">
						<h1 className="text-2xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-accent to-indigo-500 ">
						Flux - Make your own
							Link-Page
						</h1>
						<p className="mt-6 text-md lg:text-lg leading-8 text-gray-600 max-w-[600px]">
							Build and share your personalized Link-Page with Flux. Showcase
							your favorite links, social media profiles, and more in one place.
							Easy to create, customize, and share with others.
						</p>
					</div>
					<div className="mt-10 flex items-center gap-2">
						<Button variant="outline" onClick={loginModal.onOpen}>
							Sign In
						</Button>
						<Button variant="default" onClick={registerModal.onOpen}>
							Create an account
						</Button>
					</div>
				</div>
			</div>

			<div
				className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
				aria-hidden="true"
			>
				<div
					className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
				/>
			</div>
		</div>
	);
};

export default Preview;
