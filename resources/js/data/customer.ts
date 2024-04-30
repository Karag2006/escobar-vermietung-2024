import axios from "axios";

export const getCustomerById = async (id: number) => {
    const { data } = await axios.get(`/customer/${id}`);
    return data;
};
