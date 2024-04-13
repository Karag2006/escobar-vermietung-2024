import axios from "axios";

interface NavMenu {
    (): any;
}

export const useNavMenu = async () => {
    const { data } = await axios.get("/api/nav");
    return data;
};
