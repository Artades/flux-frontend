import axios from "axios";
import { parseCookies } from "nookies";

<<<<<<< HEAD
axios.defaults.baseURL = "https://flux-backnd-11a895dcfc01.herokuapp.com/";
=======
axios.defaults.baseURL = "https://flux-backnd-11a895dcfc01.herokuapp.com//";
>>>>>>> ac6f19b97b6f873087f22c6a7dc6330469222988

axios.interceptors.request.use((config) => {
	if (typeof window !== "undefined") {
		const { _token } = parseCookies();
		config.headers.Authorization = "Bearer " + _token;
	}
	return config;
});

export default axios;
