import { collisionCheckData } from "@/types/document";
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

export const getContractById = async (id: number) => {
    const { data } = await axios.get(`/contract/${id}`);
    return data;
};

export const getDocumentCollisionCheckData = async (id: number) => {
    const { data } = await axios.get(`collisiondata/${id}`);
    return data;
};

// check if there is a collision during the period requested.
export const collisionCheck = async (checkData: collisionCheckData) => {
    // send Data to backend for checking.
    const checkURL = "collisionCheck";
    const { data } = await axios.post(checkURL, checkData);
    return data;
};

// download PDF for given Document.
export const downloadPDF = async (id: number) => {
    const { data } = await axios.get(`/document/${id}`);
    return data;
};

export const forwardDocument = async (id: number) => {
    const { data } = await axios.patch(`document/${id}`, {});
    return data;
};
