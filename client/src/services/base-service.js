// import axios from 'axios'
// import { getSession } from 'next-auth/react'

// // const dotenv = require ('dotenv')
// // dotenv.config()

// const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5500'

// export async function fetchWithAuth(endpoint, options = {}) {
//     const session = await getSession()

//     if(!session){
//         throw new Error("Not authenticated")
//     }

//     if (session.error === 'RefreshTokenError' || session.error === 'MissingRefreshToken') {
//         throw new Error('Session expired. Please sign in again.')
//     }

//     const idToken = session.idToken || session.id_token
//     if (!idToken) {
//         throw new Error('Session token missing. Please sign in again.')
//     }

//     try{
//         const response = await axios({
//             // url, method, headers, data, params
//             url: `${API_URL}${endpoint}`,
//             method: options.method || 'GET',
//             headers: {
//                 Authorization: `Bearer ${idToken}`,
//                 ...options.headers
//             },
//             data: options.body,
//             params: options.params,
//         })

//         return response.data
//     } catch (error) {
//         const responseMessage = error?.response?.data?.message || error?.response?.data?.error
//         const status = error?.response?.status
//         throw new Error(responseMessage ? `Api request failed (${status}): ${responseMessage}` : 'Api request failed')
//     }
// }

import axios from "axios";
import { getSession } from "next-auth/react";

const API_URL =
	process.env.NEXT_PUBLIC_API_URL ||
	process.env.API_URL ||
	"http://localhost:5500";

export async function fetchWithAuth(endpoint, options = {}) {
	console.log("[fetchWithAuth] started");
	console.log("[fetchWithAuth] endpoint:", endpoint);
	console.log("[fetchWithAuth] options:", options);
	console.log("[fetchWithAuth] API_URL:", API_URL);

	const session = await getSession();
	console.log("[fetchWithAuth] session:", session);

	if (!session) {
		console.error("[fetchWithAuth] no session found");
		throw new Error("Not authenticated");
	}

	if (
		session.error === "RefreshTokenError" ||
		session.error === "MissingRefreshToken"
	) {
		console.error("[fetchWithAuth] session error:", session.error);
		throw new Error("Session expired. Please sign in again.");
	}

	const idToken = session.idToken || session.id_token;
	console.log("[fetchWithAuth] idToken exists:", !!idToken);

	if (!idToken) {
		console.error("[fetchWithAuth] token missing");
		throw new Error("Session token missing. Please sign in again.");
	}

	try {
		const requestConfig = {
			url: `${API_URL}${endpoint}`,
			method: options.method || "GET",
			headers: {
				Authorization: `Bearer ${idToken}`,
				...options.headers,
			},
			data: options.body,
			params: options.params,
		};

		console.log("[fetchWithAuth] axios config:", requestConfig);

		const response = await axios(requestConfig);

		console.log("[fetchWithAuth] axios success:", response);
		console.log("[fetchWithAuth] response.data:", response.data);

		return response.data;
	} catch (error) {
		console.error("[fetchWithAuth] axios error full:", error);
		console.error("[fetchWithAuth] axios error message:", error.message);
		console.error("[fetchWithAuth] axios error response:", error.response);
		console.error("[fetchWithAuth] axios error response data:", error.response?.data);
		console.error("[fetchWithAuth] axios error status:", error.response?.status);

		const responseMessage =
			error?.response?.data?.message || error?.response?.data?.error;
		const status = error?.response?.status;

		throw new Error(
			responseMessage
				? `Api request failed (${status}): ${responseMessage}`
				: `Api request failed: ${error.message}`
		);
	}
}