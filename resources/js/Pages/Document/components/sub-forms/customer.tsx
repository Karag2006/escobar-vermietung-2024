import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";

import { getCustomerById, getCustomerSelectors } from "@/data/customer";
import { PickerReturn } from "@/types";

import { InputTP24 } from "@/Components/ui/input-tp24";
import { TextareaTP24 } from "@/Components/ui/textarea-tp24";

import { DatePicker } from "@/Components/datePicker";

import { toast } from "sonner";
import { getLicenseClasses } from "@/data/settings";
import { customerType, documentType, SelectorItem } from "@/types/document";
import { documentCustomerForm } from "@/lib/document-form";
import { SelectorCombobox } from "@/Components/selector-combobox";
import { Combobox } from "@/Components/combobox";
import { CustomerError, CustomerField } from "@/types/customer";

interface CustomerFormProps {
    customerErrors?: CustomerError;
    type: customerType;
    documentType: documentType;
    customer: documentCustomerForm;
    clearSubformError: (key: string, subform: string) => void;
    handleChangeInSubForm: (
        subFormKey: string,
        subFormData: documentCustomerForm
    ) => void;
}

export const CustomerForm = ({
    type,
    documentType,
    customerErrors,
    customer,
    handleChangeInSubForm,
    clearSubformError,
}: CustomerFormProps) => {
    const [customerList, setCustomerList] = useState<SelectorItem[]>([]);
    const [drivingLicenseClasses, setDrivingLicenseClasses] = useState<
        string[]
    >([]);

    const { data, setData, post, patch, processing, errors, clearErrors } =
        useForm(customer);

    const handlePickerChange = (result: PickerReturn) => {
        const key = result.id;
        const value = result.value;
        console.log(key);
        setData((data) => ({
            ...data,
            [key]: value,
        }));
        if (key !== "id")
            handleChangeInSubForm(type, { ...data, [key]: value });
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

    const handleSubmit = () => {
        if (data.id <= 0) {
            post("/customer", {
                only: ["customers", "errors"],
                onSuccess: () => {
                    toast.success("Kunde erfolgreich angelegt");
                    close();
                },
                onError: () => {
                    toast.error("Fehler beim anlegen des Kunden");
                },
            });
        } else {
            patch(`/customer/${data.id}`, {
                only: ["customers", "errors"],
                onSuccess: () => {
                    toast.success("Kunde wurde erfolgreich geändert");
                    close();
                },
                onError: () => {
                    toast.error("Fehler beim ändern des Kunden");
                },
            });
        }
    };

    const handleClearError = (key: CustomerField) => {
        clearErrors(key);
        clearSubformError(key, type);
    };

    useEffect(() => {
        const getCurrentCustomer = () => {
            if (data.id > 0 && customer?.id !== data.id) {
                getCustomerById(data.id).then((customer) => {
                    setData({ ...customer });
                    handleChangeInSubForm(type, { ...customer });
                });
            }
        };
        getCurrentCustomer();
    }, [data.id]);

    useEffect(() => {
        setData({ ...customer });
    }, [customer]);

    useEffect(() => {
        getLicenseClasses().then((data) => {
            setDrivingLicenseClasses(data);
        });
        getCustomerSelectors().then((data) => {
            setCustomerList(data);
        });
    }, []);

    return (
        <div className="p-4">
            <div className="flex flex-col md:max-w-[calc(50%-1.25rem)] mb-10">
                <SelectorCombobox
                    id="id"
                    value={data.id}
                    items={customerList}
                    onValueChange={handlePickerChange}
                    label={`${
                        type === "customer" ? "Kunden" : "Fahrer"
                    } auswählen`}
                />
            </div>
            <div className="flex gap-10 flex-col md:flex-row">
                <div className="flex flex-col gap-6 w-full">
                    <InputTP24
                        label="Personalausweis Nr."
                        id="pass_number"
                        value={data.pass_number}
                        error={
                            errors.pass_number || customerErrors?.pass_number
                        }
                        onFocus={() => handleClearError("pass_number")}
                        onChange={handleChange}
                        disabled={processing}
                    />
                    <InputTP24
                        label="Name / Firma *"
                        id="name1"
                        value={data.name1}
                        error={errors.name1 || customerErrors?.name1}
                        onChange={handleChange}
                        onFocus={() => handleClearError("name1")}
                        disabled={processing}
                    />
                    <InputTP24
                        label="Name 2"
                        id="name2"
                        value={data.name2}
                        error={errors.name2 || customerErrors?.name2}
                        onChange={handleChange}
                        onFocus={() => handleClearError("name2")}
                        disabled={processing}
                    />
                    <DatePicker
                        label="Geburtsdatum"
                        id="birth_date"
                        fieldName="birth_date"
                        value={data.birth_date}
                        error={errors.birth_date || customerErrors?.birth_date}
                        removeError={() => handleClearError("birth_date")}
                        onUpdateValue={handlePickerChange}
                        disabled={processing}
                    />
                    <InputTP24
                        label="Geburtsort"
                        id="birth_city"
                        value={data.birth_city}
                        error={errors.birth_city || customerErrors?.birth_city}
                        onChange={handleChange}
                        onFocus={() => handleClearError("birth_city")}
                        disabled={processing}
                    />
                </div>
                <div className="flex flex-col gap-6 w-full">
                    <div className="flex gap-2">
                        <InputTP24
                            className="w-[45%]"
                            label="Postleitzahl"
                            id="plz"
                            value={data.plz}
                            error={errors.plz || customerErrors?.plz}
                            onChange={handleChange}
                            onFocus={() => handleClearError("plz")}
                            disabled={processing}
                        />
                        <InputTP24
                            className="w-full"
                            label="Ort"
                            id="city"
                            value={data.city}
                            error={errors.city || customerErrors?.city}
                            onChange={handleChange}
                            onFocus={() => handleClearError("city")}
                            disabled={processing}
                        />
                    </div>
                    <InputTP24
                        className="mb-8"
                        label="Strasse"
                        id="street"
                        value={data.street}
                        error={errors.street || customerErrors?.street}
                        onChange={handleChange}
                        onFocus={() => handleClearError("street")}
                        disabled={processing}
                    />
                    <InputTP24
                        label="Telefonnummer"
                        id="phone"
                        value={data.phone}
                        error={errors.phone || customerErrors?.phone}
                        onChange={handleChange}
                        onFocus={() => handleClearError("phone")}
                        disabled={processing}
                    />
                    <InputTP24
                        label="Kennzeichen vom Zugfahrzeug"
                        id="car_number"
                        value={data.car_number}
                        error={errors.car_number || customerErrors?.car_number}
                        onChange={handleChange}
                        onFocus={() => handleClearError("car_number")}
                        disabled={processing}
                    />
                    <InputTP24
                        label="E-Mail Adresse"
                        id="email"
                        value={data.email}
                        error={errors.email || customerErrors?.email}
                        onChange={handleChange}
                        onFocus={() => handleClearError("email")}
                        disabled={processing}
                    />
                </div>
            </div>
            <div className="flex gap-10 flex-col md:flex-row my-16">
                <InputTP24
                    className="w-full"
                    label="Führerschein Nr."
                    id="driving_license_no"
                    value={data.driving_license_no}
                    error={
                        errors.driving_license_no ||
                        customerErrors?.driving_license_no
                    }
                    onChange={handleChange}
                    onFocus={() => handleClearError("driving_license_no")}
                    disabled={processing}
                />
                <Combobox
                    items={drivingLicenseClasses}
                    className="w-full"
                    label="Führerschein Klasse"
                    id="driving_license_class"
                    value={data.driving_license_class}
                    error={
                        errors.driving_license_class ||
                        customerErrors?.driving_license_class
                    }
                    removeError={() =>
                        handleClearError("driving_license_class")
                    }
                    onValueChange={handlePickerChange}
                />
            </div>
            <div className="flex gap-10 flex-col md:flex-row">
                <TextareaTP24
                    className="w-full"
                    label="Kommentar"
                    id="comment"
                    value={data.comment}
                    error={errors.comment || customerErrors?.comment}
                    onChange={handleChange}
                    onFocus={() => handleClearError("comment")}
                    disabled={processing}
                />
            </div>
        </div>
    );
};
