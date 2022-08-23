import axios from 'axios';

const BASE_URL = "https://rajju-ecomwebapi.herokuapp.com/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmVhOWMzNTllNTA5NjlmZjY1YzZhZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MDg1Njg2NCwiZXhwIjoxNjYxMTE2MDY0fQ.q3_H_Y-5ljSckkRVcdQtUS3rGgvc4Z3hDs_apCSnMsE";

export const publicRequest = axios.create({
	baseURL: BASE_URL,
})

export const userRequest = axios.create({
	baseURL: BASE_URL,
	header: {token:`Bearer ${TOKEN}`},
})