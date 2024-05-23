import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

import { PickerReturn } from "@/types";
import { customerType, documentType, SelectorItem } from "@/types/document";
import { blankForm, documentDataForm, documentForm } from "@/lib/document-form";

import { InputTP24 } from "@/Components/ui/input-tp24";
import { TextareaTP24 } from "@/Components/ui/textarea-tp24";
import { DatePicker } from "@/Components/datePicker";
import { SelectorCombobox } from "@/Components/selector-combobox";
import { Combobox } from "@/Components/combobox";
import { TimePicker } from "@/Components/time-picker";

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

    const handlePickerChange = (result: PickerReturn) => {
        const key = result.id;
        const value = result.value;
        setData((data) => ({
            ...data,
            [key]: value,
        }));
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

    return (
        <div className="p-4">
            <div className="flex gap-10 flex-col md:flex-row">
                <TimePicker
                    value={data.collect_time}
                    id="collect_time"
                    label="Test Zeit"
                    fieldName="collect_time"
                    onUpdateValue={handlePickerChange}
                />
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
