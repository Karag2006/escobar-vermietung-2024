import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";

import { getCustomerById, getCustomerSelectors } from "@/data/customer";
import { PickerReturn } from "@/types";

import { InputTP24 } from "@/Components/ui/input-tp24";
import { TextareaTP24 } from "@/Components/ui/textarea-tp24";

import { toast } from "sonner";
import { customerType, documentType, SelectorItem } from "@/types/document";
import { blankForm, documentTrailerForm } from "@/lib/document-form";
import { SelectorCombobox } from "@/Components/selector-combobox";
import { getTrailerById, getTrailerSelectors, getTuev } from "@/data/trailer";
import { MonthPicker } from "@/Components/datePicker/month-picker";
import { LoadingSizeInput } from "@/Pages/Trailer/components/loading-size-input";
import { TuevBatch } from "@/Pages/Trailer/components/tuev-batch";

interface TrailerFormProps {
    type: "trailer";
    documentType: documentType;
    trailer: documentTrailerForm;
    tuevCompareDate?: string;
    handleChangeInSubForm: (
        subFormKey: string,
        subFormData: documentTrailerForm
    ) => void;
}

export const TrailerForm = ({
    type,
    tuevCompareDate,
    documentType,
    trailer,
    handleChangeInSubForm,
}: TrailerFormProps) => {
    const [trailerList, setTrailerList] = useState<SelectorItem[]>([]);

    const {
        data,
        setData,
        post,
        patch,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm(trailer);

    const handlePickerChange = (result: PickerReturn) => {
        const key = result.id;
        const value = result.value;
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

    const handleChangeSize = (size: {
        length: string;
        width: string;
        height: string;
    }) => {
        const temp = [
            parseInt(size.length),
            parseInt(size.width),
            parseInt(size.height),
        ];
        setData((data) => ({
            ...data,
            loading_size: temp,
        }));
        handleChangeInSubForm(type, { ...data, loading_size: temp });
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
    useEffect(() => {
        const getCurrentTrailer = () => {
            if (data.id > 0 && trailer.id !== data.id) {
                getTrailerById(data.id).then((trailer) => {
                    setData({ ...trailer });
                    handleChangeInSubForm(type, { ...trailer });
                });
            }
        };
        getCurrentTrailer();
    }, [data.id]);

    useEffect(() => {
        getTrailerSelectors().then((data) => {
            setTrailerList(data);
        });
        if (data.id > 0 && data.tuev === "") {
            getTuev(data.id).then((trailer) => {
                setData((data) => ({ ...data, tuev: trailer.tuev }));
                handleChangeInSubForm(type, { ...data, tuev: trailer.tuev });
            });
        }
    }, []);

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row gap-10 mb-10">
                <SelectorCombobox
                    className="w-full"
                    id="id"
                    value={data.id}
                    items={trailerList}
                    onValueChange={handlePickerChange}
                    label="Anhänger auswählen"
                />
                <div className="w-full flex justify-end">
                    <TuevBatch tuev={data.tuev} compareDate={tuevCompareDate} />
                </div>
            </div>
            <div className="flex gap-10 flex-col md:flex-row">
                <div className="flex flex-col gap-6 w-full">
                    <InputTP24
                        label="Anhängerbezeichnung *"
                        id="title"
                        value={data.title}
                        error={errors.title}
                        onChange={handleChange}
                        onFocus={() => clearErrors("title")}
                        disabled={processing}
                    />
                    <InputTP24
                        label="Kennzeichen *"
                        id="plateNumber"
                        value={data.plateNumber}
                        error={errors.plateNumber}
                        onChange={handleChange}
                        onFocus={() => clearErrors("plateNumber")}
                        disabled={processing}
                    />
                    <InputTP24
                        label="Fahrgestellnummer *"
                        id="chassisNumber"
                        value={data.chassisNumber}
                        error={errors.chassisNumber}
                        onFocus={() => clearErrors("chassisNumber")}
                        onChange={handleChange}
                        disabled={processing}
                    />
                </div>
                <div className="flex flex-col gap-6 w-full">
                    <div className="flex gap-2">
                        <InputTP24
                            className="w-full"
                            label="zulässiges Gesamtgewicht *"
                            id="totalWeight"
                            value={data.totalWeight}
                            error={errors.totalWeight}
                            onChange={handleChange}
                            onFocus={() => clearErrors("totalWeight")}
                            disabled={processing}
                        />
                        <InputTP24
                            className="w-full"
                            label="Nutzlast *"
                            id="usableWeight"
                            value={data.usableWeight}
                            error={errors.usableWeight}
                            onFocus={() => clearErrors("usableWeight")}
                            onChange={handleChange}
                            disabled={processing}
                        />
                    </div>
                    <LoadingSizeInput
                        value={data.loading_size}
                        errors={errors}
                        clearErrors={clearErrors}
                        handleChangeSize={handleChangeSize}
                        processing={processing}
                    />
                </div>
            </div>
            <div className="flex gap-10 flex-col md:flex-row mt-10">
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
    );
};
