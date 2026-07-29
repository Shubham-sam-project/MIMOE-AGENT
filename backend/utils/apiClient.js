import axios from "axios";


const headers = {
    "Content-Type": "application/json",
};

if (process.env.MIMOE_API_KEY) {
    headers.Authorization = `Bearer ${process.env.MIMOE_API_KEY}`;
}

const rawBaseURL = process.env.MIMOE_API?.trim().replace(/^['"]|['"]$/g, "");
const baseURL = rawBaseURL?.replace(/\/+$|\s+$/g, "");

if (!baseURL) {
    throw new Error("MIMOE_API environment variable is required and must be a valid URL");
}

console.log(`MIMOE API base URL: ${baseURL}`);

const apiClient = axios.create({
    baseURL,
    headers,
    timeout: 120000,
});


export default apiClient;