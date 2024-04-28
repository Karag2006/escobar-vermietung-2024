import axios from "axios";

export const getUserById = async (id: number) => {
    const { data } = await axios.get(`/user/${id}`);
    return data;
};
