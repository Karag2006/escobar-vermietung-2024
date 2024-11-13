import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { parse } from "date-fns";
import { toast } from "sonner";

import {
    collisionData,
    customerType,
    DataField,
    documentType,
} from "@/types/document";
import { CustomerField } from "@/types/customer";
import { TrailerField } from "@/types/trailer";

import {
    getOfferById,
    getReservationById,
    getContractById,
    collisionCheck,
} from "@/data/document";
import { getSettings } from "@/data/settings";
import {
    blankForm,
    documentCustomerForm,
    documentDataForm,
    documentSettingsForm,
    documentTrailerForm,
} from "@/lib/document-form";
import { getDocumentTypeTranslation, isObjectEmpty } from "@/lib/utils";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/Components/ui/tabs-tp24";

import { DecisionButtons } from "@/Components/decision-buttons";

import { CustomerForm } from "./sub-forms/customer";
import { TrailerForm } from "./sub-forms/trailer";
import { DataForm } from "./sub-forms/data";
import { SettingsForm } from "./sub-forms/settings";
import { CollisionDialog } from "./collision-dialog";

interface DocumentFormProps {
    documentType: documentType;
    currentID: number;
    close: () => void;
}

// 13.11.2024 - Error handling
// Types für die Fehlermeldungen
export type SubformErrors = {
    [key: string]: string;
};

export type SubformErrorBag = {
    [key: string]: SubformErrors;
};

export const DocumentForm = ({
    documentType,
    currentID,
    close,
}: DocumentFormProps) => {
    const germanDocumentType = getDocumentTypeTranslation(documentType);

    const [collisionDialog, setCollisionDialog] = useState(false);
    const [collision, setCollision] = useState<collisionData | null>(null);

    // 13.11.2024 - Error handling
    // state für die Fehlermeldungen
    const [errorsBySubform, setErrorsBySubform] = useState<SubformErrorBag>({});

    const { data, setData, errors, clearErrors, post, patch, processing } =
        useForm(blankForm);

    const handleChangeInSubForm = (
        subFormKey: string,
        subFormData:
            | documentCustomerForm
            | documentTrailerForm
            | documentDataForm
            | documentSettingsForm
    ) => {
        setData((data) => ({
            ...data,
            [subFormKey]: subFormData,
        }));
    };

    const handleSubmit = () => {
        if (!currentID) {
            if (
                data.trailer.id &&
                data.data.collect_date &&
                data.data.return_date &&
                data.data.return_time &&
                data.data.collect_time
            ) {
                data.data.collect_at = parse(
                    data.data.collect_date + " " + data.data.collect_time,
                    "dd.MM.yyyy HH:mm",
                    new Date()
                );
                data.data.return_at = parse(
                    data.data.return_date + " " + data.data.return_time,
                    "dd.MM.yyyy HH:mm",
                    new Date()
                );
                collisionCheck({
                    id: undefined,
                    vehicle_id: data.trailer.id,
                    collect_date: data.data.collect_date,
                    return_date: data.data.return_date,
                    collect_time: data.data.collect_time,
                    return_time: data.data.return_time,
                    collect_at: data.data.collect_at,
                    return_at: data.data.return_at,
                })
                    .then((data) => {
                        if (data.collision === "no") storeNewDocument();
                        else {
                            setCollision(data.collisionData);
                            setCollisionDialog(true);
                            // open Dialog informing the user about the collision
                            // with options to continue saving anyway or cancel to fix first.
                        }
                    })
                    .catch(() => {
                        storeNewDocument();
                    });
            } else {
                storeNewDocument();
                // this will fail but will generate the appropriate error object.
            }
        } else {
            if (
                data.trailer.id &&
                data.data.collect_date &&
                data.data.return_date &&
                data.data.return_time &&
                data.data.collect_time
            ) {
                data.data.collect_at = parse(
                    data.data.collect_date + " " + data.data.collect_time,
                    "dd.MM.yyyy HH:mm",
                    new Date()
                );
                data.data.return_at = parse(
                    data.data.return_date + " " + data.data.return_time,
                    "dd.MM.yyyy HH:mm",
                    new Date()
                );
                collisionCheck({
                    id: currentID,
                    vehicle_id: data.trailer.id,
                    collect_date: data.data.collect_date,
                    return_date: data.data.return_date,
                    collect_time: data.data.collect_time,
                    return_time: data.data.return_time,
                    collect_at: data.data.collect_at,
                    return_at: data.data.return_at,
                })
                    .then((data) => {
                        if (data.collision === "no") updateDocument();
                        else {
                            setCollision(data.collisionData);
                            setCollisionDialog(true);
                            // open Dialog informing the user about the collision
                            // with options to continue saving anyway or cancel to fix first.
                        }
                    })
                    .catch(() => {
                        updateDocument();
                    });
            } else updateDocument();
        }
    };

    const confirmCollision = () => {
        if (currentID) updateDocument();
        else storeNewDocument();
    };

    // 13.11.2024 - Error handling
    // Funktion zum aufteilen der Fehlermeldungen in die jeweiligen Subforms
    const handleErrors = () => {
        let localErrorsBySubform: SubformErrorBag = {};

        Object.keys(errors).forEach((key) => {
            const subform = key.substring(0, key.indexOf("."));
            const field = key.substring(key.indexOf(".") + 1);
            if (!localErrorsBySubform[subform])
                localErrorsBySubform[subform] = {};
            // @ts-ignore
            localErrorsBySubform[subform][field] = errors[key];
        });
        setErrorsBySubform(localErrorsBySubform);
    };

    // 13.11.2024 - Error handling
    // Funktion um Fehler in einer Subform zu löschen
    const clearErrorInSubform = (key: string, subform: string) => {
        // der Type von errors kennt die felder der form `${subform}.${key}` nicht
        // daher frage ich zur sicherheit nochmal ab ob das feld existiert bevor ich es lösche
        // Der entstehende TS Fehler wird ignoriert.
        // @ts-ignore
        if (errors[`${subform}.${key}`]) clearErrors(`${subform}.${key}`);
    };

    const storeNewDocument = () => {
        post(`/${documentType}`, {
            only: [`${documentType}List`, "errors"],
            onSuccess: () => {
                toast.success(`${germanDocumentType} erfolgreich angelegt`);
                close();
            },
            onError: (error) => {},
        });
    };

    const updateDocument = () => {
        patch(`/${documentType}/${currentID}`, {
            only: [`${documentType}List`, "errors"],
            onSuccess: () => {
                toast.success(
                    `${germanDocumentType} wurde erfolgreich geändert`
                );
                close();
            },
            onError: () => {
                const article = documentType === "reservation" ? "der" : "des";
                toast.error(
                    `Fehler beim ändern ${article} ${germanDocumentType}`
                );
            },
        });
    };

    const handleClearError = (
        subForm: "customer" | "trailer" | "driver" | "data",
        field: CustomerField | TrailerField | DataField
    ) => {};

    // 13.11.2024 - Error handling
    // Benutze die inertia eigenen error handling Funktionen aus useForm
    useEffect(() => {
        if (errors && !isObjectEmpty(errors)) {
            // errors enthält alle Informationen zu den Fehlern im Formular:
            // error keys haben die form: 'subform.field.subfield'
            // => wir können aus den keys die subform und das field extrahieren
            // Idee: Fehlermeldungen in ein neues Objekt errorsBySubform schreiben
            // und dieses dann an die jeweiligen subforms weitergeben

            handleErrors();
        }
    }, [errors]);

    useEffect(() => {
        const getCurrentDocument = () => {
            if (currentID) {
                if (documentType === "offer") {
                    getOfferById(currentID).then((document) =>
                        setData({ ...document })
                    );
                }
                if (documentType === "reservation") {
                    getReservationById(currentID).then((document) =>
                        setData({ ...document })
                    );
                }
                if (documentType === "contract") {
                    getContractById(currentID).then((document) =>
                        setData({ ...document })
                    );
                }
            } else {
                getSettings().then((settings) =>
                    handleChangeInSubForm("settings", settings)
                );
            }
        };
        getCurrentDocument();
    }, []);

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit}>
                <Tabs defaultValue="customer">
                    <div className="flex justify-between items-center">
                        <TabsList>
                            <TabsTrigger
                                value="customer"
                                // 13.11.2024 - Error handling
                                data-error={
                                    errorsBySubform?.customer &&
                                    !isObjectEmpty(errorsBySubform?.customer)
                                        ? "active"
                                        : ""
                                }
                            >
                                Kunde
                            </TabsTrigger>
                            <TabsTrigger
                                value="driver"
                                // 13.11.2024 - Error handling
                                data-error={
                                    errorsBySubform?.driver &&
                                    !isObjectEmpty(errorsBySubform?.driver)
                                        ? "active"
                                        : ""
                                }
                            >
                                Fahrer
                            </TabsTrigger>
                            <TabsTrigger
                                value="trailer"
                                // 13.11.2024 - Error handling
                                data-error={
                                    errorsBySubform?.trailer &&
                                    !isObjectEmpty(errorsBySubform?.trailer)
                                        ? "active"
                                        : ""
                                }
                            >
                                Anhänger
                            </TabsTrigger>
                            <TabsTrigger
                                value="data"
                                // 13.11.2024 - Error handling
                                data-error={
                                    errorsBySubform?.data &&
                                    !isObjectEmpty(errorsBySubform?.data)
                                        ? "active"
                                        : ""
                                }
                            >
                                Vertragsdaten
                            </TabsTrigger>
                            <TabsTrigger value="settings">
                                Einstellungen
                            </TabsTrigger>
                        </TabsList>
                        <DecisionButtons
                            className="items-center mt-0"
                            yesLabel="Speichern"
                            noLabel="Abbrechen"
                            yesAction={handleSubmit}
                            noAction={close}
                        />
                    </div>
                    <TabsContent value="customer">
                        <CustomerForm
                            type={customerType.CUSTOMER}
                            documentType={documentType}
                            customer={data.customer}
                            customerErrors={errorsBySubform?.customer}
                            clearSubformError={clearErrorInSubform}
                            handleChangeInSubForm={handleChangeInSubForm}
                        />
                    </TabsContent>
                    <TabsContent value="driver">
                        <CustomerForm
                            type={customerType.DRIVER}
                            documentType={documentType}
                            clearSubformError={clearErrorInSubform}
                            customer={data.driver}
                            customerErrors={errorsBySubform?.driver}
                            handleChangeInSubForm={handleChangeInSubForm}
                        />
                    </TabsContent>
                    <TabsContent value="trailer">
                        <TrailerForm
                            type="trailer"
                            documentType={documentType}
                            trailer={data.trailer}
                            trailerErrors={errorsBySubform?.trailer}
                            clearSubformError={clearErrorInSubform}
                            handleChangeInSubForm={handleChangeInSubForm}
                        />
                    </TabsContent>
                    <TabsContent value="data">
                        <DataForm
                            type="data"
                            documentType={documentType}
                            document={data}
                            dataErrors={errorsBySubform?.data}
                            clearSubformError={clearErrorInSubform}
                            handleChangeInSubForm={handleChangeInSubForm}
                        />
                    </TabsContent>
                    <TabsContent value="settings">
                        <SettingsForm
                            type="settings"
                            documentType={documentType}
                            settings={data.settings}
                            handleChangeInSubForm={handleChangeInSubForm}
                        />
                    </TabsContent>
                </Tabs>
                <DecisionButtons
                    className="ml-4"
                    yesLabel="Speichern"
                    noLabel="Abbrechen"
                    yesAction={handleSubmit}
                    noAction={close}
                />
            </form>
            {collisionDialog && collision && (
                <CollisionDialog
                    id={currentID}
                    collision={collision}
                    confirmCollision={confirmCollision}
                    setCollisionDialog={setCollisionDialog}
                />
            )}
        </div>
    );
};
