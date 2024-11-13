import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";

import { PickerReturn } from "@/types";
import {
    CollectAddressItem,
    DataErrors,
    DataField,
    documentType,
} from "@/types/document";
import { EquipmentItem } from "@/types/equipment";
import { documentDataForm, documentForm } from "@/lib/document-form";

import { getCollectAddresses } from "@/data/document";
import { getPaymentTypes } from "@/data/settings";

import { TextareaTP24 } from "@/Components/ui/textarea-tp24";
import { DatePicker } from "@/Components/datePicker";
import { Combobox } from "@/Components/combobox";
import { TimePicker } from "@/Components/time-picker";
import { CheckboxTP24 } from "@/Components/checkbox-tp24";
import { AddressCombobox } from "../address-combobox";
import { CurrencyInput } from "../currency-input";
import { EquipmentSelector } from "../equipment-selector";

interface DataFormProps {
    type: "data";
    documentType: documentType;
    document: documentForm;
    dataErrors?: DataErrors;
    clearSubformError: (key: string, subform: string) => void;
    handleChangeInSubForm: (
        subFormKey: string,
        subFormData: documentDataForm
    ) => void;
}

export const DataForm = ({
    type,
    document,
    documentType,
    dataErrors,
    handleChangeInSubForm,
    clearSubformError,
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

    const handleClearError = (key: DataField) => {
        clearErrors(key);
        clearSubformError(key, "data");
        console.log("clearing error", dataErrors);
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
                        error={errors.collect_date || dataErrors?.collect_date}
                        id="collect_date"
                        label="Abholung - Datum *"
                        fieldName="collect_date"
                        removeError={() => handleClearError("collect_date")}
                        onUpdateValue={handlePickerChange}
                    />
                    <TimePicker
                        value={data.collect_time}
                        id="collect_time"
                        label="Abholung - Uhrzeit *"
                        error={errors.collect_time || dataErrors?.collect_time}
                        fieldName="collect_time"
                        removeError={() => handleClearError("collect_time")}
                        onUpdateValue={handlePickerChange}
                    />
                    <DatePicker
                        value={data.return_date}
                        id="return_date"
                        error={errors.return_date || dataErrors?.return_date}
                        label="Rückgabe - Datum *"
                        fieldName="return_date"
                        removeError={() => handleClearError("return_date")}
                        onUpdateValue={handlePickerChange}
                    />
                    <TimePicker
                        value={data.return_time}
                        id="return_time"
                        error={errors.return_time || dataErrors?.return_time}
                        label="Rückgabe - Uhrzeit *"
                        fieldName="return_time"
                        removeError={() => handleClearError("return_time")}
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
                        error={
                            errors.collect_address_id ||
                            dataErrors?.collect_address_id
                        }
                        removeError={() =>
                            handleClearError("collect_address_id")
                        }
                        onValueChange={handlePickerChange}
                    />
                    <div className="w-full"></div>
                    <div className="w-full"></div>
                    <div className="w-full"></div>
                </div>
                <div className="flex gap-6 flex-col lg:flex-row lg:justify-between">
                    <CurrencyInput
                        id="total_price"
                        value={currencyFields.total_price}
                        error={errors.total_price || dataErrors?.total_price}
                        label="Preis (Brutto) *"
                        removeError={() => handleClearError("total_price")}
                        onValueChange={handleCurrencyInput}
                        onFinishedValueChange={handleCurrencyValueChanged}
                    />
                    <CurrencyInput
                        id="netto_price"
                        value={currencyFields.netto_price}
                        label="Netto Preis (automatisch)"
                        disabled
                        onValueChange={handleCurrencyInput}
                        onFinishedValueChange={handleCurrencyValueChanged}
                    />
                    <CurrencyInput
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
                        id="reservation_deposit_value"
                        value={currencyFields.reservation_deposit_value}
                        label="Anzahlung"
                        error={
                            errors.reservation_deposit_value ||
                            dataErrors?.reservation_deposit_value
                        }
                        removeError={() =>
                            handleClearError("reservation_deposit_value")
                        }
                        onValueChange={handleCurrencyInput}
                        onFinishedValueChange={handleCurrencyValueChanged}
                    />
                    <DatePicker
                        className="w-full"
                        value={data.reservation_deposit_date}
                        error={
                            errors.reservation_deposit_date ||
                            dataErrors?.reservation_deposit_date
                        }
                        id="reservation_deposit_date"
                        fieldName="reservation_deposit_date"
                        label="Anzahlung - bis Datum"
                        removeError={() =>
                            handleClearError("reservation_deposit_date")
                        }
                        onUpdateValue={handlePickerChange}
                    />
                    <Combobox
                        className="w-full"
                        items={paymentTypes}
                        error={
                            errors.reservation_deposit_type ||
                            dataErrors?.reservation_deposit_type
                        }
                        label="Zahlungsart Anzahlung"
                        id="reservation_deposit_type"
                        value={data.reservation_deposit_type}
                        removeError={() =>
                            handleClearError("reservation_deposit_type")
                        }
                        onValueChange={handleComboChange}
                    />
                    <CheckboxTP24
                        id="reservation_deposit_recieved"
                        className="w-full lg:justify-end"
                        checked={data.reservation_deposit_recieved}
                        error={
                            errors.reservation_deposit_recieved ||
                            dataErrors?.reservation_deposit_recieved
                        }
                        label="Anzahlung eingegangen"
                        onCheckedChange={handleCheckboxChange}
                    />
                </div>
                <div className="flex gap-6 flex-col lg:flex-row lg:justify-between">
                    {documentType === "contract" ? (
                        <>
                            <CurrencyInput
                                id="final_payment_value"
                                value={currencyFields.final_payment_value}
                                error={
                                    errors.final_payment_value ||
                                    dataErrors?.final_payment_value
                                }
                                removeError={() =>
                                    handleClearError("final_payment_value")
                                }
                                label="Restzahlung"
                                onValueChange={handleCurrencyInput}
                                onFinishedValueChange={
                                    handleCurrencyValueChanged
                                }
                            />
                            <DatePicker
                                className="w-full"
                                value={data.final_payment_date}
                                error={
                                    errors.final_payment_date ||
                                    dataErrors?.final_payment_date
                                }
                                id="final_payment_date"
                                fieldName="final_payment_date"
                                label="Restzahlung - Datum"
                                removeError={() =>
                                    handleClearError("final_payment_date")
                                }
                                onUpdateValue={handlePickerChange}
                            />
                            <Combobox
                                className="w-full"
                                items={paymentTypes}
                                label="Zahlungsart Restzahlung"
                                id="final_payment_type"
                                value={data.final_payment_type}
                                error={
                                    errors.final_payment_type ||
                                    dataErrors?.final_payment_type
                                }
                                removeError={() =>
                                    handleClearError("final_payment_type")
                                }
                                onValueChange={handleComboChange}
                            />
                            <CheckboxTP24
                                id="final_payment_recieved"
                                className="w-full lg:justify-end"
                                checked={data.final_payment_recieved}
                                error={
                                    errors.final_payment_recieved ||
                                    dataErrors?.final_payment_recieved
                                }
                                label="Restzahlung eingegangen"
                                onCheckedChange={handleCheckboxChange}
                            />
                        </>
                    ) : (
                        <CurrencyInput
                            id="final_payment_value"
                            className="w-[calc(25%-1rem)]"
                            value={currencyFields.final_payment_value}
                            error={
                                errors.final_payment_value ||
                                dataErrors?.final_payment_value
                            }
                            removeError={() =>
                                handleClearError("final_payment_value")
                            }
                            label="Restzahlung"
                            onValueChange={handleCurrencyInput}
                            onFinishedValueChange={handleCurrencyValueChanged}
                        />
                    )}
                </div>
                {documentType === "contract" ? (
                    <div className="flex gap-6 flex-col lg:flex-row lg:justify-between">
                        <CurrencyInput
                            id="contract_bail"
                            value={currencyFields.contract_bail}
                            error={
                                errors.contract_bail ||
                                dataErrors?.contract_bail
                            }
                            removeError={() =>
                                handleClearError("contract_bail")
                            }
                            label="Kaution"
                            onValueChange={handleCurrencyInput}
                            onFinishedValueChange={handleCurrencyValueChanged}
                        />
                        <DatePicker
                            className="w-full"
                            value={data.contract_bail_date}
                            error={
                                errors.contract_bail_date ||
                                dataErrors?.contract_bail_date
                            }
                            id="contract_bail_date"
                            fieldName="contract_bail_date"
                            label="Kaution - Datum"
                            removeError={() =>
                                handleClearError("contract_bail_date")
                            }
                            onUpdateValue={handlePickerChange}
                        />
                        <div className="flex flex-col gap-6 w-full">
                            <Combobox
                                className="w-full"
                                items={paymentTypes}
                                label="Zahlart Kaution"
                                id="contract_bail_type"
                                value={data.contract_bail_type}
                                error={
                                    errors.contract_bail_type ||
                                    dataErrors?.contract_bail_type
                                }
                                removeError={() =>
                                    handleClearError("contract_bail_type")
                                }
                                onValueChange={handleComboChange}
                            />
                            <CheckboxTP24
                                id="contract_bail_recieved"
                                className="w-full justify-end"
                                checked={data.contract_bail_recieved}
                                error={
                                    errors.contract_bail_recieved ||
                                    dataErrors?.contract_bail_recieved
                                }
                                label="Kaution erhalten"
                                onCheckedChange={handleCheckboxChange}
                            />
                        </div>
                        <div className="flex flex-col gap-6 w-full">
                            <Combobox
                                className="w-full"
                                items={paymentTypes}
                                label="Zahlart Kaution Erstattung"
                                id="contract_bail_return_type"
                                value={data.contract_bail_return_type}
                                error={
                                    errors.contract_bail_return_type ||
                                    dataErrors?.contract_bail_return_type
                                }
                                removeError={() =>
                                    handleClearError(
                                        "contract_bail_return_type"
                                    )
                                }
                                onValueChange={handleComboChange}
                            />
                            <CheckboxTP24
                                id="contract_bail_returned"
                                className="w-full justify-end"
                                checked={data.contract_bail_returned}
                                error={
                                    errors.contract_bail_returned ||
                                    dataErrors?.contract_bail_returned
                                }
                                label="Kaution erstattet"
                                onCheckedChange={handleCheckboxChange}
                            />
                        </div>
                    </div>
                ) : null}
                <div className="flex gap-6 flex-col lg:flex-row lg:justify-between">
                    <EquipmentSelector
                        onListChange={handleEquipmentChange}
                        selectedList={data.selectedEquipmentList || []}
                    />
                </div>
                <div className="flex gap-10 flex-col lg:flex-row lg:justify-between">
                    <TextareaTP24
                        className="w-full"
                        label="Kommentar"
                        id="comment"
                        value={data.comment}
                        error={errors.comment || dataErrors?.comment}
                        onChange={handleChange}
                        onFocus={() => handleClearError("comment")}
                        disabled={processing}
                    />
                </div>
            </div>
        </div>
    );
};
