import { useEffect, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { subYears } from "date-fns";

import { AnalysisProps, AnalysisType } from "@/types/analysis";
import { SelectorItem } from "@/types/document";
import { TrailerItem } from "@/types/trailer";
import { PickerReturn } from "@/types";

import { createTrailerAnalysis, getTrailerSelectors } from "@/data/trailer";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { SelectorCombobox } from "@/Components/selector-combobox";
import { Button } from "@/Components/ui/button";

import { DatePicker, DatePickerReturn } from "./components/datePicker";
import { AnalysisResults } from "./components/AnalysisResults";

const Analysis = ({ auth, analysis, trailer }: AnalysisProps) => {
    const [currentAnalysis, setCurrentAnalysis] = useState<
        AnalysisType | undefined | null
    >(analysis);
    const [currentTrailer, setCurrentTrailer] = useState<
        TrailerItem | undefined | null
    >(trailer);

    const [errorMessage, setErrorMessage] = useState("");
    const [trailerList, setTrailerList] = useState<SelectorItem[]>([]);

    const pageTitle = "Anhänger Auswertung";
    const { data, setData, errors } = useForm({
        trailerId: 0,
        startDate: subYears(new Date(), 1),
        endDate: new Date(),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        setCurrentAnalysis(null);
        setCurrentTrailer(null);
        createTrailerAnalysis(data.trailerId, data)
            .then(({ data }) => {
                setCurrentAnalysis(data.analysis);
                setCurrentTrailer(data.trailer);
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    setErrorMessage("Bitte füllen Sie alle Felder aus.");
                } else if (error.response.status === 500) {
                    setErrorMessage(
                        "Ein interner Server Fehler ist aufgetreten."
                    );
                } else if (error.response.status === 404) {
                    setErrorMessage(
                        "Keine Mietverträge für diesen Anhänger im Auswertungszeitraum."
                    );
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
                {currentAnalysis && currentTrailer ? (
                    <AnalysisResults
                        analysisData={currentAnalysis}
                        trailer={currentTrailer}
                        startDate={data.startDate}
                        endDate={data.endDate}
                    />
                ) : errorMessage ? (
                    <div className="text-red-600 font-semibold">
                        {errorMessage}
                    </div>
                ) : null}
            </div>
        </AuthenticatedLayout>
    );
};

export default Analysis;
