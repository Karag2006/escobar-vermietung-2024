import axios from "axios";

const get = async (url: string) => {
    const { data } = await axios.get(url);
    return data;
};

export const useApi = async () => {
    const navMenu = await get("/api/nav");

    return {
        navMenu,
    };
};
