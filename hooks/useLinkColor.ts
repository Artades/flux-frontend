import {create} from "zustand";
import { getColorByIcon, Icon } from "../utils/getColorByName";

type LinkColorState = {
	linkColor: Icon | string;
	setLinkColor: (color: Icon | string) => void;
};

const useLinkColor = create<LinkColorState>((set) => ({
	linkColor: "",
	setLinkColor: (color) => set(() => ({ linkColor: color })),
}));

export const useLinkColorStore = () => useLinkColor();

export const getLinkColorByIcon = (link: string): Icon | string => {
	return getColorByIcon(link);
};
