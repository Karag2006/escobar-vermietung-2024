import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import { getEquipmentById } from "@/data/equipment";
import { PickerReturn } from "@/types";

import { InputTP24 } from "@/Components/ui/input-tp24";
import { TextareaTP24 } from "@/Components/ui/textarea-tp24";
import { Combobox } from "@/Components/combobox";
import { DatePicker } from "@/Components/datePicker";
import { DecisionButtons } from "@/Components/decision-buttons";
import { toast } from "sonner";

interface EquipmentFormProps {
    currentID: number;
    close: () => void;
}

export const EquipmentForm = ({ currentID, close }: EquipmentFormProps) => {
    const {
        data,
        setData,
        post,
        patch,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        id: currentID,
        pass_number: "",
        name1: "",
        name2: "",
        birth_date: "",
        birth_city: "",
        street: "",
        plz: "",
        city: "",
        phone: "",
        email: "",
        driving_license_no: "",
        driving_license_class: "",
        car_number: "",
        comment: "",
    });

    const handlePickerChange = (result: PickerReturn) => {
        const key = result.id;
        const value = result.value;
        setData((data) => ({
            ...data,
            [key]: value,
        }));
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
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentID) {
            post("/equipment", {
                only: ["equipmentList", "errors"],
                onSuccess: () => {
                    toast.success("Zubehör erfolgreich angelegt");
                    close();
                },
                onError: () => {
                    toast.error("Fehler beim anlegen des Zubehör");
                },
            });
        } else {
            patch(`/equipment/${currentID}`, {
                only: ["equipmentList", "errors"],
                onSuccess: () => {
                    toast.success("Zubehör wurde erfolgreich geändert");
                    close();
                },
                onError: () => {
                    toast.error("Fehler beim ändern des Zubehör");
                },
            });
        }
    };
    useEffect(() => {
        const getCurrentEquipment = () => {
            if (currentID) {
                getEquipmentById(currentID).then((equipment) =>
                    setData({ ...equipment })
                );
            }
        };
        getCurrentEquipment();
        return;
    }, []);

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit}>
                <div className="flex gap-10 flex-col md:flex-row">
                    <div className="flex flex-col gap-6 w-full">
                        <InputTP24
                            label="Personalausweis Nr."
                            id="pass_number"
                            value={data.pass_number}
                            error={errors.pass_number}
                            onFocus={() => clearErrors("pass_number")}
                            onChange={handleChange}
                            disabled={processing}
                        />
                        <InputTP24
                            label="Name / Firma *"
                            id="name1"
                            value={data.name1}
                            error={errors.name1}
                            onChange={handleChange}
                            onFocus={() => clearErrors("name1")}
                            disabled={processing}
                        />
                        <InputTP24
                            label="Name 2"
                            id="name2"
                            value={data.name2}
                            error={errors.name2}
                            onChange={handleChange}
                            onFocus={() => clearErrors("name2")}
                            disabled={processing}
                        />
                        <DatePicker
                            label="Geburtsdatum"
                            id="birth_date"
                            fieldName="birth_date"
                            value={data.birth_date}
                            error={errors.birth_date}
                            removeError={() => clearErrors("birth_date")}
                            onUpdateValue={handlePickerChange}
                            disabled={processing}
                        />
                        <InputTP24
                            label="Geburtsort"
                            id="birth_city"
                            value={data.birth_city}
                            error={errors.birth_city}
                            onChange={handleChange}
                            onFocus={() => clearErrors("birth_city")}
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
                                error={errors.plz}
                                onChange={handleChange}
                                onFocus={() => clearErrors("plz")}
                                disabled={processing}
                            />
                            <InputTP24
                                className="w-full"
                                label="Ort"
                                id="city"
                                value={data.city}
                                error={errors.city}
                                onChange={handleChange}
                                onFocus={() => clearErrors("city")}
                                disabled={processing}
                            />
                        </div>
                        <InputTP24
                            className="mb-8"
                            label="Strasse"
                            id="street"
                            value={data.street}
                            error={errors.street}
                            onChange={handleChange}
                            onFocus={() => clearErrors("street")}
                            disabled={processing}
                        />
                        <InputTP24
                            label="Telefonnummer"
                            id="phone"
                            value={data.phone}
                            error={errors.phone}
                            onChange={handleChange}
                            onFocus={() => clearErrors("phone")}
                            disabled={processing}
                        />
                        <InputTP24
                            label="Kennzeichen vom Zugfahrzeug"
                            id="car_number"
                            value={data.car_number}
                            error={errors.car_number}
                            onChange={handleChange}
                            onFocus={() => clearErrors("car_number")}
                            disabled={processing}
                        />
                        <InputTP24
                            label="E-Mail Adresse"
                            id="email"
                            value={data.email}
                            error={errors.email}
                            onChange={handleChange}
                            onFocus={() => clearErrors("email")}
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
                        error={errors.driving_license_no}
                        onChange={handleChange}
                        onFocus={() => clearErrors("driving_license_no")}
                        disabled={processing}
                    />
                    <Combobox
                        items={["B", "BE", "B96", "Klasse 3"]}
                        className="w-full"
                        label="Führerschein Klasse"
                        id="driving_license_class"
                        value={data.driving_license_class}
                        error={errors.driving_license_class}
                        removeError={() => clearErrors("driving_license_class")}
                        onValueChange={handlePickerChange}
                    />
                </div>
                <div className="flex gap-10 flex-col md:flex-row mb-10">
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
                <DecisionButtons
                    yesLabel="Speichern"
                    noLabel="Abbrechen"
                    sendForm
                    noAction={close}
                />
            </form>
        </div>
    );
};
