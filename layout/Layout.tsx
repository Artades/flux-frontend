import Header from "@/components/header/Header";
import React, { FunctionComponent } from "react";


type LayoutProps = {
	children: React.ReactNode;
};

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
	return (
		<div className="min-h-screen  ">
			<Header />
			<main className="container ">{children}</main>
		</div>
	);
};

export default Layout;
