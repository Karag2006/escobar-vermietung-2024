import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

import { PickerReturn } from "@/types";
import {
    CollectAddressItem,
    customerType,
    documentType,
    SelectorItem,
} from "@/types/document";
import { blankForm, documentDataForm, documentForm } from "@/lib/document-form";

import { InputTP24 } from "@/Components/ui/input-tp24";
import { TextareaTP24 } from "@/Components/ui/textarea-tp24";
import { DatePicker } from "@/Components/datePicker";
import { SelectorCombobox } from "@/Components/selector-combobox";
import { Combobox } from "@/Components/combobox";
import { TimePicker } from "@/Components/time-picker";
import { getCollectAddresses } from "@/data/document";
import { AddressCombobox } from "../address-combobox";
import { CurrencyInput } from "../currency-input";
import { CheckboxTP24 } from "@/Components/checkbox-tp24";
import { getPaymentTypes, getSettings } from "@/data/settings";
import { EquipmentSelector } from "../equipment-selector";
import { getEquipmentList } from "@/data/equipment";
import { EquipmentItem } from "@/types/equipment";

interface DataFormProps {
    type: "data";
    documentType: documentType;
    document: documentForm;
    handleChangeInSubForm: (
        subFormKey: string,
        subFormData: documentDataForm
    ) => void;
}

export const DataForm = ({
    type,
    document,
    documentType,
    handleChangeInSubForm,
}: DataFormProps) => {
    const floatToString = (floatValue: number) => {
        if (floatValue) return floatValue.toFixed(2).replace(".", ",");
        return "";
    };
    const stringToFloat = (stringValue: string) => {
        if (stringValue) return parseFloat(stringValue.replace(",", "."));
        return 0.0;
    };

    const [collectAdresses, setCollectAdresses] = useState<
        CollectAddressItem[]
    >([]);
    const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>([]);
    const [paymentTypes, setPaymentTypes] = useState<string[]>([]);
    const {
        data,
        setData,
        post,
        patch,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm(document.data);
    const [currencyFields, setCurrencyFields] = useState({
        total_price: floatToString(data.total_price),
        netto_price: floatToString(data.netto_price),
        tax_value: floatToString(data.tax_value),
        reservation_deposit_value: floatToString(
            data.reservation_deposit_value
        ),
        final_payment_value: floatToString(data.final_payment_value),
        contract_bail: "100",
    });

    const calculateVatValues = (totalValue: number) => {
        if (totalValue > 0) {
            const netValue =
                Math.round(
                    (totalValue / (1 + document.settings.vat / 100)) * 1e2
                ) / 1e2;
            const vatValue = Math.round((totalValue - netValue) * 1e2) / 1e2;
            setCurrencyFields((currencyFields) => ({
                ...currencyFields,
                tax_value: floatToString(vatValue),
                netto_price: floatToString(netValue),
            }));
            setData((data) => ({
                ...data,
                tax_value: vatValue,
                netto_price: netValue,
            }));
            handleChangeInSubForm(type, {
                ...data,
                tax_value: vatValue,
                netto_price: netValue,
            });
        }
    };
    const calculateDeposit = (totalValue: number, currentDeposit: number) => {
        let deposit = currentDeposit;
        if (deposit <= 0) {
            if (totalValue > 0) {
                const depositValue =
                    Math.round(totalValue * (1 / 3) * 1e2) / 1e2;

                setCurrencyFields((currencyFields) => ({
                    ...currencyFields,
                    reservation_deposit_value: floatToString(depositValue),
                }));
                setData((data) => ({
                    ...data,
                    reservation_deposit_value: depositValue,
                }));
                handleChangeInSubForm(type, {
                    ...data,
                    reservation_deposit_value: depositValue,
                });
                calculateFinalPayment(totalValue, depositValue);
            }
        }
    };
    const calculateFinalPayment = (
        totalValue: number,
        currentDeposit: number
    ) => {
        let deposit = currentDeposit;
        let finalPayment = 0.0;

        if (totalValue > 0) {
            if (!deposit || deposit <= 0) {
                finalPayment = Math.round(totalValue * 1e2) / 1e2;
                deposit = Math.round(0.0 * 1e2) / 1e2;
            } else {
                finalPayment = Math.round((totalValue - deposit) * 1e2) / 1e2;
            }
            setCurrencyFields((currencyFields) => ({
                ...currencyFields,
                final_payment_value: floatToString(finalPayment),
            }));
            setData((data) => ({
                ...data,
                final_payment_value: finalPayment,
            }));
            handleChangeInSubForm(type, {
                ...data,
                final_payment_value: finalPayment,
            });
        }
    };
    const calculateValues = (totalValue: number, depositValue: number) => {
        calculateVatValues(totalValue);
        if (documentType !== "contract")
            calculateDeposit(totalValue, depositValue);
        else calculateFinalPayment(totalValue, depositValue);
    };

    const handlePickerChange = (result: PickerReturn) => {
        const key = result.id;
        const value = result.value;
        setData((data) => ({
            ...data,
            [key]: value,
        }));
        handleChangeInSubForm(type, { ...data, [key]: value });
    };
    const handleCurrencyInput = (e: React.FormEvent<HTMLInputElement>) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;

        setCurrencyFields((currencyFields) => ({
            ...currencyFields,
            [key]: value,
        }));
        setData((data) => ({
            ...data,
            [key]: stringToFloat(value),
        }));
        handleChangeInSubForm(type, { ...data, [key]: value });
    };

    const handleCurrencyValueChanged = (
        e: React.FormEvent<HTMLInputElement>
    ) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;

        if (key === "total_price") {
            calculateValues(
                stringToFloat(value),
                data.reservation_deposit_value
                    ? data.reservation_deposit_value
                    : 0
            );
        }
        if (key === "reservation_deposit_value")
            calculateFinalPayment(data.total_price, stringToFloat(value));
    };

    const handleChange = (
        e:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>
            | React.FormEvent<HTMLSelectElement>
    ) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;
        setData((data) => ({
            ...data,
            [key]: value,
        }));
        handleChangeInSubForm(type, { ...data, [key]: value });
    };

    const handleComboChange = (result: PickerReturn) => {
        setData((data) => ({
            ...data,
            [result.id]: result.value,
        }));
        handleChangeInSubForm(type, { ...data, [result.id]: result.value });
    };

    const handleEquipmentChange = (list: EquipmentItem[]) => {
        setData((data) => ({
            ...data,
            selectedEquipmentList: list,
        }));

        handleChangeInSubForm(type, { ...data, selectedEquipmentList: list });
    };

    const handleCheckboxChange = (result: {
        id: string | number;
        checked: boolean;
    }) => {
        const key = result.id;
        const checked = result.checked;
        setData((data) => ({
            ...data,
            [key]: checked,
        }));
        handleChangeInSubForm(type, { ...data, [key]: checked });
    };

    useEffect(() => {
        getCollectAddresses().then((data) => {
            setCollectAdresses(data);
        });
        getPaymentTypes().then((data) => {
            setPaymentTypes(data);
        });
    }, []);

    return (
        <div className="p-4">
            <div className="flex gap-10 flex-col">
                <div className="flex gap-6 flex-col lg:flex-row lg:justify-between">
                    <DatePicker
                        value={data.collect_date}
                        id="collect_date"
                        label="Abholung - Datum *"
                        fieldName="collect_date"
                        onUpdateValue={handlePickerChange}
                    />
                    <TimePicker
                        value={data.collect_time}
                        id="collect_time"
                        label="Abholung - Uhrzeit *"
                        fieldName="collect_time"
                        onUpdateValue={handlePickerChange}
                    />
                    <DatePicker
                        value={data.return_date}
                        id="return_date"
                        label="Rückgabe - Datum *"
                        fieldName="return_date"
                        onUpdateValue={handlePickerChange}
                    />
                    <TimePicker
                        value={data.return_time}
                        id="return_time"
                        label="Rückgabe - Uhrzeit *"
                        fieldName="return_time"
                        onUpdateValue={handlePickerChange}
                    />
                </div>
                <div className="flex gap-6 flex-col md:flex-row lg:justify-between">
                    <AddressCombobox
                        className="w-full"
                        items={collectAdresses}
                        label="Abhol Anschrift *"
                        id="collect_address_id"
                        value={data.collect_address_id}
                        error={errors.collect_address_id}
                        removeError={() => clearErrors("collect_address_id")}
                        onValueChange={handlePickerChange}
                    />
                    <div className="w-full"></div>
                    <div className="w-full"></div>
                    <div className="w-full"></div>
                </div>
                <div className="flex gap-6 flex-col lg:flex-row lg:justify-between">
                    <CurrencyInput
                        className="w-full"
                        id="total_price"
                        value={currencyFields.total_price}
                        label="Preis (Brutto) *"
                        onValueChange={handleCurrencyInput}
                        onFinishedValueChange={handleCurrencyValueChanged}
                    />
                    <CurrencyInput
                        className="w-full"
                        id="netto_price"
                        value={currencyFields.netto_price}
                        label="Netto Preis (automatisch)"
                        disabled
                        onValueChange={handleCurrencyInput}
                        onFinishedValueChange={handleCurrencyValueChanged}
                    />
                    <CurrencyInput
                        className="w-full"
                        id="tax_value"
                        value={currencyFields.tax_value}
                        label="Umsatzsteuer (automatisch)"
                        disabled
                        onValueChange={handleCurrencyInput}
                        onFinishedValueChange={handleCurrencyValueChanged}
                    />
                </div>
                <div className="flex gap-6 flex-col lg:flex-row lg:justify-between">
                    <CurrencyInput
                        className="w-full"
                        id="reservation_deposit_value"
                        value={currencyFields.reservation_deposit_value}
                        label="Anzahlung"
                        onValueChange={handleCurrencyInput}
                        onFinishedValueChange={handleCurrencyValueChanged}
                    />
                    <DatePicker
                        className="w-full"
                        value={data.reservation_deposit_date}
                        id="reservation_deposit_date"
                        fieldName="reservation_deposit_date"
                        label="Anzahlung - bis Datum"
                        onUpdateValue={handlePickerChange}
                    />
                    <Combobox
                        className="w-full"
                        items={paymentTypes}
                        label="Zahlungsart Anzahlung"
                        id="reservation_deposit_type"
                        value={data.reservation_deposit_type}
                        onValueChange={handleComboChange}
                    />
                    <CheckboxTP24
                        id="reservation_deposit_recieved"
                        className="w-full lg:justify-end"
                        checked={data.reservation_deposit_recieved}
                        label="Anzahlung eingegangen"
                        onCheckedChange={handleCheckboxChange}
                    />
                </div>
                <div className="flex gap-6 flex-col lg:flex-row lg:justify-between">
                    <CurrencyInput
                        id="final_payment_value"
                        value={currencyFields.final_payment_value}
                        label="Restzahlung"
                        onValueChange={handleCurrencyInput}
                        onFinishedValueChange={handleCurrencyValueChanged}
                    />
                </div>
                <div className="flex gap-6 flex-col lg:flex-row lg:justify-between">
                    <EquipmentSelector
                        onListChange={handleEquipmentChange}
                        selectedList={data.selectedEquipmentList}
                    />
                </div>
                <div className="flex gap-10 flex-col lg:flex-row lg:justify-between">
                    <TextareaTP24
                        className="w-full"
                        label="Kommentar"
                        id="comment"
                        value={data.comment}
                        error={errors.comment}
                        onChange={handleChange}
                        onFocus={() => clearErrors("comment")}
                        disabled={processing}
                    />
                </div>
            </div>
        </div>
    );
};
