import axios from "axios";

export const getEquipmentById = async (id: number) => {
    const { data } = await axios.get(`/equipment/${id}`);
    return data;
};

export const getEquipmentList = async () => {
    const { data } = await axios.get("/api/equipment");
    return data;
};
