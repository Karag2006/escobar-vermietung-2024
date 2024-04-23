import { create } from "zustand";

type State = {
    open: {
        delete: boolean;
        user: boolean;
    };
    style: "delete" | "user";
};

type Action = {
    switchOpen: (status: boolean, style: State["style"]) => void;
};

export const useModalStore = create<State & Action>((set) => ({
    open: {
        delete: false,
        user: false,
    },
    style: "delete",
    switchOpen: (status: boolean, style: State["style"]) =>
        set((state) => {
            const keys = Object.keys(state.open);
            keys.forEach((key) => (state.open[key] = false));
            state.open[style] = status;
            state.style = style;
            console.log(state);
            return state;
        }),
}));
