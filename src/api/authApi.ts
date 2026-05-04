import axios from "axios";
import type Iuser from "../interfaces/Iuser";
import { API_BASE_URL } from "./apiConfig";

export async function register({ email, name, password }: Iuser) {
  const response = await axios.post(`${API_BASE_URL}/users`, {
    email,
    name,
    password,
  });
  return response.data;
}


export async function login({ email, password }: Pick<Iuser, 'email' | 'password'>) {
  const response = await axios.get(`${API_BASE_URL}/users?email=${email}&password=${password}`);
  return response.data;
}

export async function updateUser(
  id: string,
  payload: Partial<Pick<Iuser, "name" | "email" | "password">>
) {
  const response = await axios.patch(`${API_BASE_URL}/users/${id}`, payload);
  return response.data;
}