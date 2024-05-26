import { create } from "zustand";

type State = {
    total_price: string;
    netto_price: string;
    tax_value: string;
    reservation_deposit_value: string;
    final_payment_value: string;
    contract_bail: string;
};

type Actions = {
    calculateValues: () => void;
    calculateVatValues: () => void;
    calculateDeposit: () => void;
    calculateFinalPayment: () => void;
    updateData: (data: {
        total_price: number;
        netto_price: number;
        tax_value: number;
        reservation_deposit_value: number;
        final_payment_value: number;
        contract_bail: number;
    }) => void;
};

const floatToString = (floatValue: number) => {
    if (floatValue) return String(floatValue).replace(".", ",");
    return "";
};

const stringToFloat = (stringValue: string) => {
    if (stringValue) return parseFloat(stringValue.replace(",", "."));
    return 0.0;
};

export const useCurrencyStore = create<State & Actions>((set) => ({
    total_price: "",
    netto_price: "",
    tax_value: "",
    reservation_deposit_value: "",
    final_payment_value: "",
    contract_bail: "",
    updateData: (data) =>
        set({
            total_price: floatToString(data.total_price),
            netto_price: floatToString(data.netto_price),
            tax_value: floatToString(data.tax_value),
            reservation_deposit_value: floatToString(
                data.reservation_deposit_value
            ),
            final_payment_value: floatToString(data.final_payment_value),
            contract_bail: floatToString(data.contract_bail),
        }),
}));
