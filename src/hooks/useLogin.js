import { useMutation } from "react-query";
import pb from "../lib/pocketbase";

export default function useLogin() {
  async function login({ email, password }) {
    try {
      const authData = await pb.admins.authWithPassword(email,password);
      pb.authStore.save(authData.token, authData.admin); 
      pb.autoCancellation(false)
      console.log('Authenticated:', authData);
      return authData;
    } catch (error) {
      throw new Error('Authentication failed: ' + error.message);
    }
  }

  return useMutation(login);
}
