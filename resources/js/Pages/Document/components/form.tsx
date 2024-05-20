import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import { DecisionButtons } from "@/Components/decision-buttons";
import { toast } from "sonner";
import { getOfferById } from "@/data/document";
import { blankForm } from "@/lib/document-form";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/Components/ui/tabs-tp24";
import { CustomerForm } from "./sub-forms/customer";

interface DocumentFormProps {
    documentType: string;
    currentID: number;
    close: () => void;
}

export const DocumentForm = ({
    documentType,
    currentID,
    close,
}: DocumentFormProps) => {
    const { data, setData, post, patch, processing, errors, clearErrors } =
        useForm(blankForm);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentID) {
            post(`/${documentType}`, {
                only: [`${documentType}List`, "errors"],
                onSuccess: () => {
                    toast.success("Kunde erfolgreich angelegt");
                    close();
                },
                onError: () => {
                    toast.error("Fehler beim anlegen des Kunden");
                },
            });
        } else {
            patch(`/customer/${currentID}`, {
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
        const getCurrentDocument = () => {
            if (currentID) {
                if (documentType === "offer") {
                    getOfferById(currentID).then((document) =>
                        setData({ ...document })
                    );
                }
            }
        };
        getCurrentDocument();
    }, []);

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit}>
                <Tabs defaultValue="customer">
                    <TabsList>
                        <TabsTrigger value="customer">Kunde</TabsTrigger>
                        <TabsTrigger value="driver">Fahrer</TabsTrigger>
                        <TabsTrigger value="trailer">Anhänger</TabsTrigger>
                        <TabsTrigger value="data">Vertragsdaten</TabsTrigger>
                        <TabsTrigger value="settings">
                            Einstellungen
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="customer">
                        <CustomerForm />
                    </TabsContent>
                    <TabsContent value="driver"></TabsContent>
                    <TabsContent value="trailer"></TabsContent>
                    <TabsContent value="data"></TabsContent>
                    <TabsContent value="settings"></TabsContent>
                </Tabs>
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
