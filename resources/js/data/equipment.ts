import axios from "axios";

export const getEquipmentById = async (id: number) => {
    const { data } = await axios.get(`/equipment/${id}`);
    return data;
};
