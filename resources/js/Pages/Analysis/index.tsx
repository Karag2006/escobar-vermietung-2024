import { AnalysisProps } from "@/types/analysis";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { SelectorCombobox } from "@/Components/selector-combobox";
import { useEffect, useState } from "react";
import { getTrailerSelectors } from "@/data/trailer";
import { SelectorItem } from "@/types/document";
import { PickerReturn } from "@/types";
import { DatePicker, DatePickerReturn } from "./components/datePicker";
import { format } from "date-fns";

const Analysis = ({ auth }: AnalysisProps) => {
    const [trailerList, setTrailerList] = useState<SelectorItem[]>([]);
    const pageTitle = "Anhänger Auswertung";
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
        trailerId: 0,
        startDate: new Date(),
        endDate: new Date(),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handlePickerChange = (result: PickerReturn) => {
        const key = "trailerId";
        const value = Number(result.value); // force value to be a number
        setData((data) => ({
            ...data,
            [key]: value,
        }));
    };

    const handleDateChange = (result: DatePickerReturn) => {
        const key = result.id;
        const value = result.value;
        setData((data) => ({
            ...data,
            [key]: value,
        }));
    };

    useEffect(() => {
        getTrailerSelectors().then((data) => {
            setTrailerList(data);
        });
    }, []);

    return (
        <AuthenticatedLayout user={auth.user} header={pageTitle}>
            <Head title={pageTitle} />
            <div className="flex flex-col gap-16 min-h-[600px]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <SelectorCombobox
                        className="w-full"
                        id="trailerId"
                        value={data.trailerId}
                        items={trailerList}
                        onValueChange={handlePickerChange}
                        label="Anhänger auswählen"
                    />
                    <div className="mt-8 flex gap-6 flex-col lg:flex-row lg:justify-between">
                        <DatePicker
                            value={data.startDate}
                            error={errors.startDate}
                            id="startDate"
                            label="Anfangsdatum"
                            fieldName="startDate"
                            onUpdateValue={handleDateChange}
                        />
                        <DatePicker
                            value={data.endDate}
                            error={errors.endDate}
                            id="endDate"
                            label="Enddatum"
                            fieldName="endDate"
                            onUpdateValue={handleDateChange}
                        />
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Analysis;
