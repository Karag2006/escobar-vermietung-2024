import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import { getEquipmentById } from "@/data/equipment";
import { PickerReturn } from "@/types";

import { InputTP24 } from "@/Components/ui/input-tp24";
import { TextareaTP24 } from "@/Components/ui/textarea-tp24";
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
        defaultNumber: 1,
        name: "",
        details: "",
    });

    const handleChange = (
        e:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>
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
                            label="Bezeichnung *"
                            id="name"
                            value={data.name}
                            error={errors.name}
                            onFocus={() => clearErrors("name")}
                            onChange={handleChange}
                            disabled={processing}
                        />
                        <InputTP24
                            label="Standard Anzahl *"
                            id="defaultNumber"
                            value={data.defaultNumber}
                            error={errors.defaultNumber}
                            onChange={handleChange}
                            onFocus={() => clearErrors("defaultNumber")}
                            disabled={processing}
                        />
                    </div>
                    <div className="flex flex-col gap-6 w-full">
                        <TextareaTP24
                            className="w-full"
                            label="Details"
                            id="details"
                            value={data.details}
                            error={errors.details}
                            onChange={handleChange}
                            onFocus={() => clearErrors("details")}
                            disabled={processing}
                        />
                    </div>
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
