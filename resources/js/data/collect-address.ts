import axios from "axios";

export const getAddressById = async (id: number) => {
    const { data } = await axios.get(`/collectaddress/${id}`);
    return data;
};
