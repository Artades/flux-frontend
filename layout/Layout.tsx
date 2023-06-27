
import Navbar from "@/components/header/Navbar";
import React, { FunctionComponent } from "react";


type LayoutProps = {
	children: React.ReactNode;
};

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
	return (
		<div className="min-h-screen  ">
			<Navbar />
			<main className="container ">{children}</main>
		</div>
	);
};

export default Layout;
