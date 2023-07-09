import axios from "axios";
import { parseCookies } from "nookies";



axios.defaults.baseURL = "https://fluux-server-0712fc9cf32e.herokuapp.com/";


axios.interceptors.request.use((config) => {
	if (typeof window !== "undefined") {
		const { _token } = parseCookies();
		config.headers.Authorization = "Bearer " + _token;
	}
	return config;
});

export default axios;
