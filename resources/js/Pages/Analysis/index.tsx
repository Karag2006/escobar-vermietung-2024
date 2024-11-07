import { AnalysisProps } from "@/types/analysis";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { SelectorCombobox } from "@/Components/selector-combobox";
import { useEffect, useState } from "react";
import { createTrailerAnalysis, getTrailerSelectors } from "@/data/trailer";
import { SelectorItem } from "@/types/document";
import { PickerReturn } from "@/types";
import { DatePicker, DatePickerReturn } from "./components/datePicker";
import { format, subYears } from "date-fns";
import { Button } from "@/Components/ui/button";
import { AnalysisResults } from "./components/AnalysisResults";

const Analysis = ({ auth, analysis, trailer }: AnalysisProps) => {
    const [trailerList, setTrailerList] = useState<SelectorItem[]>([]);
    const pageTitle = "Anhänger Auswertung";
    const { data, setData, post, processing, errors } = useForm({
        trailerId: 0,
        startDate: subYears(new Date(), 1),
        endDate: new Date(),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createTrailerAnalysis(data.trailerId, data).then((result) => {
            if (result.status === 200) {
                console.log("Analysis created");
            }
        });
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
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="mt-8 flex gap-6 flex-col lg:flex-row lg:justify-between">
                        <SelectorCombobox
                            className="w-full max-w-[400px]"
                            id="trailerId"
                            value={data.trailerId}
                            items={trailerList}
                            onValueChange={handlePickerChange}
                            label="Anhänger auswählen"
                        />
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
                    <div className="flex justify-start gap-4">
                        <Button type="submit">
                            <span className="text-sm">Absenden</span>
                        </Button>
                    </div>
                </form>
                {analysis && trailer ? (
                    <AnalysisResults
                        analysisData={analysis}
                        trailer={trailer}
                        startDate={data.startDate}
                        endDate={data.endDate}
                    />
                ) : null}
            </div>
        </AuthenticatedLayout>
    );
};

export default Analysis;
