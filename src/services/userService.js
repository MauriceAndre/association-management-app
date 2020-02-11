import http from "./httpService";

const apiEndpoint = "/users";

export async function register(user) {
  return await http.post(apiEndpoint, user);
}

export async function getAllUsers() {
  const response = await http.get(apiEndpoint);
  return response.data;
}

export default {
  register,
  getAllUsers
};
