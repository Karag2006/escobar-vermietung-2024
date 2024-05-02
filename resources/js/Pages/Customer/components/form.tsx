import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import { InputTP24 } from "@/Components/ui/input-tp24";
import { DecisionButtons } from "@/Components/decision-buttons";

import { getCustomerById } from "@/data/customer";
import { TextareaTP24 } from "@/Components/ui/textarea-tp24";
import { Combobox } from "@/Components/combobox";

interface CustomerFormProps {
    currentID: number;
    close: () => void;
}

export const CustomerForm = ({ currentID, close }: CustomerFormProps) => {
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
            post("/customer", {
                only: ["customers", "errors"],
                onSuccess: (page) => {
                    close();
                },
                onError: (errors) => {
                    console.log(errors);
                },
            });
        } else {
            patch(`/customer/${currentID}`, {
                only: ["customers", "errors"],
                onSuccess: (page) => {
                    close();
                },
                onError: (errors) => {
                    console.log(errors);
                },
            });
        }
    };
    useEffect(() => {
        const getCurrentCustomer = () => {
            if (currentID) {
                getCustomerById(currentID).then((customer) =>
                    setData({ ...customer })
                );
            }
        };
        getCurrentCustomer();
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
                            onChange={handleChange}
                            disabled={processing}
                        />
                        <InputTP24
                            label="Name / Firma *"
                            id="name1"
                            value={data.name1}
                            onChange={handleChange}
                            disabled={processing}
                        />
                        <InputTP24
                            label="Name 2"
                            id="name2"
                            value={data.name2}
                            onChange={handleChange}
                            disabled={processing}
                        />
                        <InputTP24
                            label="Geburtsdatum"
                            id="birth_date"
                            value={data.birth_date}
                            onChange={handleChange}
                            disabled={processing}
                        />
                        <InputTP24
                            label="Geburtsort"
                            id="birth_city"
                            value={data.birth_city}
                            onChange={handleChange}
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
                                onChange={handleChange}
                                disabled={processing}
                            />
                            <InputTP24
                                className="w-full"
                                label="Ort"
                                id="city"
                                value={data.city}
                                onChange={handleChange}
                                disabled={processing}
                            />
                        </div>
                        <InputTP24
                            className="mb-8"
                            label="Strasse"
                            id="street"
                            value={data.street}
                            onChange={handleChange}
                            disabled={processing}
                        />
                        <InputTP24
                            label="Telefonnummer"
                            id="phone"
                            value={data.phone}
                            onChange={handleChange}
                            disabled={processing}
                        />
                        <InputTP24
                            label="Kennzeichen vom Zugfahrzeug"
                            id="car_number"
                            value={data.car_number}
                            onChange={handleChange}
                            disabled={processing}
                        />
                        <InputTP24
                            label="E-Mail Adresse"
                            id="email"
                            value={data.email}
                            onChange={handleChange}
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
                        onChange={handleChange}
                        disabled={processing}
                    />
                    <Combobox
                        items={["B", "BE", "B96", "Klasse 3"]}
                        className="w-full"
                        label="Führerschein Klasse"
                        id="driving_license_class"
                        value={data.driving_license_class}
                    />
                </div>
                <div className="flex gap-10 flex-col md:flex-row mb-10">
                    <TextareaTP24
                        className="w-full"
                        label="Kommentar"
                        id="comment"
                        value={data.comment}
                        onChange={handleChange}
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
