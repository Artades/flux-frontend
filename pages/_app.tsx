import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";

import Layout from "@/layout/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	// Check if the current route starts with "/home/links"
const isLinkRoute =
	router.pathname.startsWith("/home/links") ||
	router.pathname.startsWith("/home/create") ||
	router.pathname.startsWith("/home/profile") ||
	router.pathname.startsWith("/home/settings");

	// Render the layout only for "/home/links" routes
	if (isLinkRoute) {
		return (
			<>
				

				<ToastContainer />
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</>
		);
	}

	// Render the component without the layout for other routes
	return (
		<>
			<LoginModal />
			<RegisterModal />
			<ToastContainer />
			<Component {...pageProps} />
		</>
	);
}
