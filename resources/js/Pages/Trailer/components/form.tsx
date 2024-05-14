import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import { getTrailerById } from "@/data/trailer";
import { PickerReturn } from "@/types";

import { InputTP24 } from "@/Components/ui/input-tp24";
import { TextareaTP24 } from "@/Components/ui/textarea-tp24";
import { DecisionButtons } from "@/Components/decision-buttons";
import { MonthPicker } from "@/Components/datePicker/month-picker";
import { LoadingSizeInput } from "./loading-size-input";

interface TrailerFormProps {
    currentID: number;
    close: () => void;
}

export const TrailerForm = ({ currentID, close }: TrailerFormProps) => {
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
        loading_size: [],
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
        clearErrors(key);
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentID) {
            post("/trailer", {
                only: ["trailers", "errors"],
                onSuccess: (page) => {
                    close();
                },
                onError: (errors) => {
                    // console.log(errors);
                },
            });
        } else {
            patch(`/trailer/${currentID}`, {
                only: ["trailers", "errors"],
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
                            disabled={processing}
                        />
                        <InputTP24
                            label="Kennzeichen *"
                            id="plateNumber"
                            value={data.plateNumber}
                            error={errors.plateNumber}
                            onChange={handleChange}
                            disabled={processing}
                        />
                        <InputTP24
                            label="Fahrgestellnummer *"
                            id="chassisNumber"
                            value={data.chassisNumber}
                            error={errors.chassisNumber}
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
                                disabled={processing}
                            />
                            <InputTP24
                                className="w-full"
                                label="Nutzlast *"
                                id="usableWeight"
                                value={data.usableWeight}
                                error={errors.usableWeight}
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
                <div className="flex gap-10 flex-col md:flex-row my-10">
                    <TextareaTP24
                        className="w-full"
                        label="Kommentar"
                        id="comment"
                        value={data.comment}
                        error={errors.comment}
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
