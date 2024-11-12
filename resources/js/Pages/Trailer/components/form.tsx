import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { parse } from "date-fns";

import { PickerReturn } from "@/types";

import { getTrailerById } from "@/data/trailer";

import { InputTP24 } from "@/Components/ui/input-tp24";
import { TextareaTP24 } from "@/Components/ui/textarea-tp24";
import { DecisionButtons } from "@/Components/decision-buttons";
import { MonthPicker } from "@/Components/datePicker/month-picker";

import { LoadingSizeInput } from "./loading-size-input";

interface TrailerFormProps {
    currentID: number;
    close: () => void;
}

export type LoadingSizeErrors = {
    "loading_size.0"?: string;
    "loading_size.1"?: string;
    "loading_size.2"?: string;
};

export const TrailerForm = ({ currentID, close }: TrailerFormProps) => {
    const emptySize: number[] = [];
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
        title: "",
        plateNumber: "",
        chassisNumber: "",
        tuev: "",
        totalWeight: "",
        usableWeight: "",
        loading_size: emptySize,
        comment: "",
    });
    const [loadingSizeErrors, setLoadingSizeErrors] =
        useState<LoadingSizeErrors>({});

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
    };

    const handleSizeErrors = () => {
        // 12.11.2024 - Error Handling for Loading Size
        if (errors) {
            Object.keys(errors).forEach((key) => {
                if (
                    key === "loading_size.0" ||
                    key === "loading_size.1" ||
                    key === "loading_size.2"
                ) {
                    setLoadingSizeErrors((loadingSizeErrors) => ({
                        ...loadingSizeErrors,
                        // @ts-ignore
                        [key]: errors[key],
                    }));
                }
            });
        }
    };

    const clearLoadingSizeErrors = (key: keyof LoadingSizeErrors) => {
        setLoadingSizeErrors((loadingSizeErrors) => ({
            ...loadingSizeErrors,
            [key]: "",
        }));
        // 12.11.2024 - Error Handling for Loading Size
        // @ts-ignore
        clearErrors(key);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentID) {
            post("/trailer", {
                only: ["trailers", "errors"],
                onSuccess: () => {
                    toast.success("Anhänger erfolgreich angelegt");
                    close();
                },
                onError: () => {
                    toast.error("Fehler beim anlegen des Anhänger");
                },
            });
        } else {
            patch(`/trailer/${currentID}`, {
                only: ["trailers", "errors"],
                onSuccess: () => {
                    toast.success("Anhänger erfolgreich geändert");
                    close();
                },
                onError: () => {
                    toast.error("Fehler beim ändern des Anhänger");
                },
            });
        }
    };
    useEffect(() => {
        const getCurrentTrailer = () => {
            if (currentID) {
                getTrailerById(currentID).then((trailer) =>
                    setData({ ...trailer })
                );
            }
        };
        getCurrentTrailer();
        return;
    }, []);

    // 12.11.2024 - Error Handling for Loading Size
    useEffect(() => {
        handleSizeErrors();
    }, [errors]);

    // 12.11.2024 - Fix Inspection Date Edit
    useEffect(() => {
        if (data.tuev) {
            // Das Datum wird auf den 2. des Monats gesetzt, da es sonst zu Problemen mit dem Datum kommen kann
            // z.B. 30.11.2024 statt 01.12.2024 (timzone unterschiede zwischen client und server)
            const date = parse(data.tuev + "/02", "MM/yy/dd", new Date());
            setData((data) => ({
                ...data,
                inspection_at: date,
            }));
        }
    }, [data.tuev]);

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit}>
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
                        <MonthPicker
                            label="Tüv Fälligkeit"
                            id="tuev"
                            value={data.tuev}
                            error={errors.tuev}
                            fieldName="tuev"
                            removeError={() => clearErrors("tuev")}
                            onUpdateValue={handlePickerChange}
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
                            handleChangeSize={handleChangeSize}
                            errors={loadingSizeErrors}
                            // 12.11.2024 - Error Handling for Loading Size
                            clearErrors={clearLoadingSizeErrors}
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
