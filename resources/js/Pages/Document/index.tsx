import { useEffect, useState } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import { toast } from "sonner";

import { TriangleAlert } from "lucide-react";

import {
    getDocumentNextTypeTranslation,
    getDocumentPluralTypeTranslation,
    getDocumentTypeArticle,
    getDocumentTypeTranslation,
} from "@/lib/utils";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { DataTable } from "@/Components/data-table";
import { ActionButton } from "@/Components/action-button";
import { Modal } from "@/Components/wrapper/modal";
import { ModalCardWrapper } from "@/Components/wrapper/modal-card-wrapper";
import { DecisionButtons } from "@/Components/decision-buttons";

import { collisionData, Document, DocumentProps } from "@/types/document";
import {
    archiveDocument,
    collisionCheck,
    downloadPDF,
    forwardDocument,
    getContractById,
    getDocumentCollisionCheckData,
    getOfferById,
    getReservationById,
} from "@/data/document";
import { DocumentForm } from "./components/form";
import { offerColumns } from "./offer-columns";
import { reservationColumns } from "./reservation-columns";
import { contractColumns } from "./contract-columns";
import { CollisionDialog } from "./components/collision-dialog";
import { Actions } from "@/types";

export default function index({
    auth,
    offerList,
    reservationList,
    contractList,
    type,
    ForwardDocument,
    queryParams,
}: DocumentProps) {
    const germanDocumentType = getDocumentTypeTranslation(type);
    const germanDocumentTypePlural = getDocumentPluralTypeTranslation(type);
    const germanDocumentTypeArticle = getDocumentTypeArticle(type);
    const germanDocumentNextType = getDocumentNextTypeTranslation(type);
    const pageTitle = germanDocumentTypePlural;
    const [confirmModal, setConfirmModal] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [forward, setForward] = useState(false);
    const [currentID, setCurrentID] = useState(0);
    const [documentName, setDocumentName] = useState("");

    const [collisionDialog, setCollisionDialog] = useState(false);
    const [collisionId, setCollisionId] = useState(0);
    const [collision, setCollision] = useState<collisionData | null>(null);

    const Form = useForm({
        id: currentID,
    });

    const addDocumentModal = () => {
        setCurrentID(0);
        setModalOpen(true);
    };

    const actions: Actions = {
        edit: {
            function: (id: number) => {
                setCurrentID(id);
                setModalOpen(true);
            },
            tooltip: `${germanDocumentType} bearbeiten`,
        },
        delete: {
            function: (id: number) => {
                setCurrentID(id);
                if (type === "offer") {
                    getOfferById(id).then((offer) => {
                        setDocumentName(offer.data.offer_number);
                    });
                }
                if (type === "reservation") {
                    getReservationById(id).then((reservation) => {
                        setDocumentName(reservation.data.reservation_number);
                    });
                }
                if (type === "contract") {
                    getContractById(id).then((contract) => {
                        setDocumentName(contract.data.contract_number);
                    });
                }
                setConfirmModal(true);
            },
            tooltip: `${germanDocumentType} löschen`,
        },
        forward:
            type === "contract"
                ? undefined
                : {
                      function: (id: number) => {
                          setCurrentID(id);
                          setForward(true);
                          if (type === "offer") {
                              getOfferById(id).then((offer) => {
                                  setDocumentName(offer.data.offer_number);
                                  setConfirmModal(true);
                              });
                          }
                          if (type === "reservation") {
                              getReservationById(id).then((reservation) => {
                                  setDocumentName(
                                      reservation.data.reservation_number
                                  );
                                  setConfirmModal(true);
                              });
                          }
                      },
                      tooltip: `in ${germanDocumentNextType} umwandeln`,
                  },
        print: {
            function: (id: number) => {
                if (id) {
                    downloadPDF(id).then((data) => {
                        const fileURL = data;
                        let link = document.createElement("a");
                        link.href = fileURL;
                        link.target = "_blank";
                        link.setAttribute("open", "");
                        document.body.appendChild(link);

                        link.click();
                    });
                }
            },
            tooltip: `${germanDocumentType} als PDF Drucken`,
        },

        archive: {
            function: async (document: Document) => {
                const data = await archiveDocument(
                    document.id ? document.id : 0
                );
                if (data.is_archived) {
                    toast.success(`${germanDocumentType} archiviert`);
                    router.reload({
                        only: ["offerList", "reservationList", "contractList"],
                    });
                }
            },
            tooltip: `${germanDocumentType} archivieren`,
        },
    };

    const confirm = (id?: number) => {
        if (!forward) {
            // confirm is used to delete or forward a document.
            // if we ware not forwarding we are deleting.
            if (type === "offer") {
                Form.delete(`/offer/${id}`, {
                    only: ["offerList"],
                    onSuccess: (page) => {
                        onDeleteSuccess();
                    },
                });
            }
            if (type === "reservation") {
                Form.delete(`/reservation/${id}`, {
                    only: ["reservationList"],
                    onSuccess: (page) => {
                        onDeleteSuccess();
                    },
                });
            }
            if (type === "contract") {
                Form.delete(`/contract/${id}`, {
                    only: ["contractList"],
                    onSuccess: (page) => {
                        onDeleteSuccess();
                    },
                });
            }
        } else {
            if (id) {
                setConfirmModal(false);
                checkCollision(id);
            }
        }
    };

    const checkCollision = (id: number) => {
        getDocumentCollisionCheckData(id).then((data) => {
            data.id = id;
            collisionCheck(data).then((data) => {
                if (data.collision === "no") doForward(id);
                else {
                    setCollisionId(id);
                    setCollision(data.collisionData);
                    setCollisionDialog(true);
                }
            });
        });
    };

    const confirmCollision = (id?: number) => {
        if (forward && id) doForward(id);
    };

    const onDeleteSuccess = () => {
        toast.success(`${germanDocumentType} gelöscht`);
        setConfirmModal(false);
    };

    const cancelConfirm = () => {
        setConfirmModal(false);
    };

    const doForward = (id: number) => {
        forwardDocument(id).then((data) => {
            router.get(
                `/${data.current_state}`,
                {},
                {
                    headers: {
                        forwardDocument: data.id,
                    },
                }
            );
        });
    };

    useEffect(() => {
        if (ForwardDocument && ForwardDocument > 0) {
            actions.edit?.function(ForwardDocument);
        }
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={pageTitle}
            headerAction={
                <ActionButton
                    label={`${germanDocumentType} hinzufügen`}
                    actionType="add"
                    action={addDocumentModal}
                />
            }
        >
            <Head title={pageTitle} />

            {type === "offer" && (
                <DataTable
                    queryParams={queryParams}
                    columns={offerColumns}
                    data={offerList ? offerList : []}
                    actions={actions}
                />
            )}
            {type === "reservation" && (
                <DataTable
                    queryParams={queryParams}
                    columns={reservationColumns}
                    data={reservationList ? reservationList : []}
                    actions={actions}
                />
            )}
            {type === "contract" && (
                <DataTable
                    queryParams={queryParams}
                    columns={contractColumns}
                    data={contractList ? contractList : []}
                    actions={actions}
                />
            )}
            {collisionDialog && collision && (
                <CollisionDialog
                    id={collisionId}
                    collision={collision}
                    setCollisionDialog={setCollisionDialog}
                    confirmCollision={confirmCollision}
                />
            )}
            <Modal modalOpen={confirmModal} openChange={setConfirmModal}>
                <ModalCardWrapper
                    header={
                        !forward ? (
                            <h3 className="font-semibold text-xl text-gray-800">
                                {germanDocumentType} löschen
                            </h3>
                        ) : (
                            <h3 className="font-semibold text-xl text-gray-800">
                                In {germanDocumentNextType} umwandeln
                            </h3>
                        )
                    }
                    showHeader
                    footer={
                        <DecisionButtons
                            yesLabel={!forward ? "Löschen" : "Umwandeln"}
                            noLabel="Abbrechen"
                            id={currentID}
                            yesAction={confirm}
                            noAction={cancelConfirm}
                        />
                    }
                >
                    {!forward ? (
                        <p>
                            {`Soll ${germanDocumentTypeArticle} ${germanDocumentType} `}
                            <span className="font-bold">
                                "Nr: {documentName}"
                            </span>{" "}
                            wirklich gelöscht werden?
                        </p>
                    ) : (
                        <p>
                            {`Soll ${germanDocumentTypeArticle} ${germanDocumentType} Nr: `}
                            <span className="font-bold">
                                "Nr: {documentName}"
                            </span>
                            {` wirklich in ${germanDocumentNextType} umwandeln?`}
                        </p>
                    )}
                    <p className="flex gap-2">
                        <TriangleAlert className="h-5 w-5  text-destructive" />
                        Diese Aktion kann nicht rückgängig gemacht werden!
                        <TriangleAlert className="h-5 w-5  text-destructive" />
                    </p>
                </ModalCardWrapper>
            </Modal>
            <Modal
                className="xl:max-w-[1600px]"
                modalOpen={modalOpen}
                openChange={setModalOpen}
                title="Dokumenten Formular"
                description="Formular zum Anlegen oder Bearbeiten eines Dokuments"
            >
                <ModalCardWrapper
                    header={
                        <h3 className="font-semibold text-xl text-gray-800">
                            {currentID === 0
                                ? `${germanDocumentType} anlegen`
                                : `${germanDocumentType} bearbeiten`}
                        </h3>
                    }
                    showHeader
                >
                    <DocumentForm
                        currentID={currentID}
                        close={() => setModalOpen(false)}
                        documentType={type}
                    />
                </ModalCardWrapper>
            </Modal>
        </AuthenticatedLayout>
    );
}
