import axios from "axios";

export const getSettings = async () => {
    const { data } = await axios.get(`/settings/1`);
    return data;
};

export const getLicenseClasses = async () => {
    const { data } = await axios.get("/settings/licenseclasses/1");
    return data;
};

export const getPaymentTypes = async () => {
    const { data } = await axios.get("/settings/paymenttypes/1");
    return data;
};
