import axios from "axios";

export const getSettings = async () => {
    const { data } = await axios.get(`/trailer/1`);
    return data;
};
