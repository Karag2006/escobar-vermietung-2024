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
import { collisionData, customerType, documentType } from "@/types/document";
import { TrailerForm } from "./sub-forms/trailer";
import { DataForm } from "./sub-forms/data";
import { SettingsForm } from "./sub-forms/settings";
import { getSettings } from "@/data/settings";
import { getDocumentTypeTranslation } from "@/lib/utils";
import { Modal } from "@/Components/wrapper/modal";
import { ModalCardWrapper } from "@/Components/wrapper/modal-card-wrapper";
import { CollisionDialog } from "./collision-dialog";

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

    const { data, setData, post, patch, processing, errors, clearErrors } =
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
            collisionCheck({
                id: undefined,
                vehicle_id: data.trailer.id,
                collect_date: data.data.collect_date,
                return_date: data.data.return_date,
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
            collisionCheck({
                id: currentID,
                vehicle_id: data.trailer.id,
                collect_date: data.data.collect_date,
                return_date: data.data.return_date,
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
            onError: () => {
                const article = documentType === "reservation" ? "der" : "des";
                toast.error(
                    `Fehler beim anlegen ${article} ${germanDocumentType}`
                );
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
                            <TabsTrigger value="customer">Kunde</TabsTrigger>
                            <TabsTrigger value="driver">Fahrer</TabsTrigger>
                            <TabsTrigger value="trailer">Anhänger</TabsTrigger>
                            <TabsTrigger value="data">
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
                            handleChangeInSubForm={handleChangeInSubForm}
                        />
                    </TabsContent>
                    <TabsContent value="driver">
                        <CustomerForm
                            type={customerType.DRIVER}
                            documentType={documentType}
                            customer={data.driver}
                            handleChangeInSubForm={handleChangeInSubForm}
                        />
                    </TabsContent>
                    <TabsContent value="trailer">
                        <TrailerForm
                            type="trailer"
                            documentType={documentType}
                            trailer={data.trailer}
                            handleChangeInSubForm={handleChangeInSubForm}
                        />
                    </TabsContent>
                    <TabsContent value="data">
                        <DataForm
                            type="data"
                            documentType={documentType}
                            document={data}
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
