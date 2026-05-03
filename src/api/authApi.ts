import axios from "axios";
import type Iuser from "../interfaces/Iuser";

export async function register({ email, name, password }: Iuser) {
  const response = await axios.post('http://localhost:3001/users', {
    email,
    name,
    password,
  });
  return response.data;
}


export async function login({ email, password }: Pick<Iuser, 'email' | 'password'>) {
  const response = await axios.get(`http://localhost:3001/users?email=${email}&password=${password}`);
  return response.data;
}

export async function updateUser(
  id: string,
  payload: Pick<Iuser, "name" | "email">
) {
  const response = await axios.patch(`http://localhost:3001/users/${id}`, payload);
  return response.data;
}