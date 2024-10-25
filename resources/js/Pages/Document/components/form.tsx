import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";

import { DecisionButtons } from "@/Components/decision-buttons";
import { toast } from "sonner";
import {
    getOfferById,
    getReservationById,
    getContractById,
    collisionCheck,
} from "@/data/document";
import {
    blankForm,
    documentCustomerForm,
    documentDataForm,
    documentSettingsForm,
    documentTrailerForm,
} from "@/lib/document-form";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/Components/ui/tabs-tp24";
import { CustomerForm } from "./sub-forms/customer";
import {
    collisionData,
    customerType,
    DataField,
    documentType,
} from "@/types/document";
import { TrailerForm } from "./sub-forms/trailer";
import { DataForm } from "./sub-forms/data";
import { SettingsForm } from "./sub-forms/settings";
import { getSettings } from "@/data/settings";
import { getDocumentTypeTranslation, isObjectEmpty } from "@/lib/utils";
import { Modal } from "@/Components/wrapper/modal";
import { ModalCardWrapper } from "@/Components/wrapper/modal-card-wrapper";
import { CollisionDialog } from "./collision-dialog";
import { CustomerField } from "@/types/customer";
import { TrailerField } from "@/types/trailer";
import { parse } from "date-fns";

interface DocumentFormProps {
    documentType: documentType;
    currentID: number;
    close: () => void;
}

export const DocumentForm = ({
    documentType,
    currentID,
    close,
}: DocumentFormProps) => {
    const germanDocumentType = getDocumentTypeTranslation(documentType);

    const [collisionDialog, setCollisionDialog] = useState(false);
    const [collision, setCollision] = useState<collisionData | null>(null);
    const [dataErrors, setDataErrors] = useState({
        customer: {},
        driver: {},
        trailer: {},
        data: {},
    });

    const { data, setData, post, patch, processing } = useForm(blankForm);

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
                data.data.collectAt = parse(
                    data.data.collect_date + " " + data.data.collect_time,
                    "dd.MM.yyyy HH:mm",
                    new Date()
                );
                data.data.returnAt = parse(
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
                    collectAt: data.data.collectAt,
                    returnAt: data.data.returnAt,
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
                data.data.collectAt = parse(
                    data.data.collect_date + " " + data.data.collect_time,
                    "dd.MM.yyyy HH:mm",
                    new Date()
                );
                data.data.returnAt = parse(
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
                    collectAt: data.data.collectAt,
                    returnAt: data.data.returnAt,
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

    const storeNewDocument = () => {
        post(`/${documentType}`, {
            only: [`${documentType}List`, "errors"],
            onSuccess: () => {
                toast.success(`${germanDocumentType} erfolgreich angelegt`);
                close();
            },
            onError: (error) => {
                const article = documentType === "reservation" ? "der" : "des";
                toast.error(
                    `Fehler beim anlegen ${article} ${germanDocumentType}`
                );

                if (error) {
                    let customerEntries: string[][] = [];
                    let driverEntries: string[][] = [];
                    let trailerEntries: string[][] = [];
                    let dataEntries: string[][] = [];
                    Object.entries(error).forEach((err) => {
                        const dotIndex = err[0].indexOf(".");
                        const bagName = err[0].substring(0, dotIndex);
                        const fieldName = err[0].substring(dotIndex + 1);
                        const message = err[1];
                        if (bagName === "customer")
                            customerEntries.push([fieldName, message]);
                        if (bagName === "driver")
                            driverEntries.push([fieldName, message]);
                        if (bagName === "trailer")
                            trailerEntries.push([fieldName, message]);
                        if (bagName === "data")
                            dataEntries.push([fieldName, message]);
                    });

                    console.log(
                        isObjectEmpty(Object.fromEntries(driverEntries))
                    );

                    setDataErrors({
                        customer: Object.fromEntries(customerEntries),
                        driver: Object.fromEntries(driverEntries),
                        trailer: Object.fromEntries(trailerEntries),
                        data: Object.fromEntries(dataEntries),
                    });

                    // setError("customer", Object.fromEntries(customerEntries));
                    // setError("driver", Object.fromEntries(driverEntries));
                    // setError("trailer", Object.fromEntries(trailerEntries));
                    // setError("data", Object.fromEntries(dataEntries));
                }
            },
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
    ) => {
        setDataErrors((errors) => ({
            ...errors,
            [subForm]: {
                ...errors[subForm],
                [field]: undefined,
            },
        }));
    };

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
                                data-error={
                                    !isObjectEmpty(dataErrors?.customer)
                                        ? "active"
                                        : ""
                                }
                            >
                                Kunde
                            </TabsTrigger>
                            <TabsTrigger
                                value="driver"
                                data-error={
                                    !isObjectEmpty(dataErrors?.driver)
                                        ? "active"
                                        : ""
                                }
                            >
                                Fahrer
                            </TabsTrigger>
                            <TabsTrigger
                                value="trailer"
                                data-error={
                                    !isObjectEmpty(dataErrors?.trailer)
                                        ? "active"
                                        : ""
                                }
                            >
                                Anhänger
                            </TabsTrigger>
                            <TabsTrigger
                                value="data"
                                data-error={
                                    !isObjectEmpty(dataErrors?.data)
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
                            customerErrors={dataErrors?.customer}
                            clearCustomerError={(field: CustomerField) =>
                                handleClearError("customer", field)
                            }
                            handleChangeInSubForm={handleChangeInSubForm}
                        />
                    </TabsContent>
                    <TabsContent value="driver">
                        <CustomerForm
                            type={customerType.DRIVER}
                            documentType={documentType}
                            clearCustomerError={(field: CustomerField) =>
                                handleClearError("driver", field)
                            }
                            customer={data.driver}
                            customerErrors={dataErrors?.driver}
                            handleChangeInSubForm={handleChangeInSubForm}
                        />
                    </TabsContent>
                    <TabsContent value="trailer">
                        <TrailerForm
                            type="trailer"
                            documentType={documentType}
                            trailer={data.trailer}
                            trailerErrors={dataErrors?.trailer}
                            clearTrailerError={(field: TrailerField) =>
                                handleClearError("trailer", field)
                            }
                            handleChangeInSubForm={handleChangeInSubForm}
                        />
                    </TabsContent>
                    <TabsContent value="data">
                        <DataForm
                            type="data"
                            documentType={documentType}
                            document={data}
                            dataErrors={dataErrors?.data}
                            clearDataError={(field: DataField) =>
                                handleClearError("data", field)
                            }
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
