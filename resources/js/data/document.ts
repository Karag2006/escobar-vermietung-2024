import axios from "axios";

export const getCollectAddresses = async () => {
    const { data } = await axios.get("/collectaddress");
    return data;
};

export const getOfferById = async (id: number) => {
    const { data } = await axios.get(`/offer/${id}`);
    return data;
};

export const getReservationById = async (id: number) => {
    const { data } = await axios.get(`/reservation/${id}`);
    return data;
};
