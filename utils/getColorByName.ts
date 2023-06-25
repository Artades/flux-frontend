const linkColor = {
	instagram: "#C13584",
	twitter: "#1DA1F2",
	vk: "#0C75A3",
	reddit: "#FF4500",
	github: "#33d",
	viber: "#FFFFFF",
	ok: "#FF8C00",
	pinterest: "#EE0000",
	facebook: "#3B5998",
	discord: "#9999DA",
	imessage: "#007AFF",
	tiktok: "#000000",
	telegram: "#0088CC",
	snapchat: "#FFFC00",
	youtube: "#FF0000",
	lincedin: "#0A66C2",
} as const;
export type Color = (typeof linkColor)[keyof typeof linkColor];
export type Icon = keyof typeof linkColor;

export const getColorByIcon = (link: string): Icon | string => {
	return linkColor[link.toLowerCase() as Icon];
};
