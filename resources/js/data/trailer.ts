import axios from "axios";

export const getTrailerById = async (id: number) => {
    const { data } = await axios.get(`/trailer/${id}`);
    return data;
};

export const getTrailerSelectors = async () => {
    const { data } = await axios.get("/selector/trailer");
    return data;
};
