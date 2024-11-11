import { collisionCheckData } from "@/types/document";
import axios from "axios";

export const getCollectAddresses = async () => {
    const { data } = await axios.get("/collectaddress");
    return data;
};

// Falls der aktuelle status eines Dokuments nicht bekannt ist,
// benötigen wir trotzdem eine Funktion um das Dokument allein anhand seiner ID zu laden.
export const getDocumentById = async (id: number) => {
    const { data } = await axios.get(route("document.show", id));
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

export const storeDocument = async (documentData: any) => {
    const { data } = await axios.post(route("document.store"), documentData);
    return data;
};

export const updateDocument = async (id: number, documentData: any) => {
    const { data } = await axios.patch(
        route("document.update", id),
        documentData
    );
    return data;
};

export const deleteDocument = async (id: number) => {
    const { data } = await axios.delete(route("document.delete", id));
    return data;
};

export const getDocumentCollisionCheckData = async (id: number) => {
    const { data } = await axios.get(route("collisionCheck.data", id));
    return data;
};

// check if there is a collision during the period requested.
export const collisionCheck = async (checkData: collisionCheckData) => {
    // send Data to backend for checking.
    const checkURL = route("collisionCheck");
    const { data } = await axios.post(checkURL, checkData);
    return data;
};

// download PDF for given Document.
export const downloadPDF = async (id: number) => {
    const { data } = await axios.get(`/document/${id}`);
    return data;
};

export const forwardDocument = async (id: number) => {
    const { data } = await axios.patch(route("forwardDocument", id), {});
    return data;
};

// 04.11.2024 Feature: Add Archive functionality
export const archiveDocument = async (id: number) => {
    const { data } = await axios.patch(route("archive.toggle", id), {});
    return data;
};
