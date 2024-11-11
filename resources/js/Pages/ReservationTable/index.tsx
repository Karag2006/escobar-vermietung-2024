import { ReservationTableProps } from "@/types/document";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { ActionButton } from "@/Components/action-button";
import { Table } from "./components/table";
import { addMonths, format, isDate, parse, subMonths } from "date-fns";
import { de } from "date-fns/locale";
import { useState } from "react";
import { Picker } from "@/Components/datePicker/picker";
import { Button } from "@/Components/ui/button";
import { ChevronLeft, ChevronRight, TriangleAlert } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";

import { ModalCardWrapper } from "@/Components/wrapper/modal-card-wrapper";
import { Modal } from "@/Components/wrapper/modal";
import { QuickReservationModal } from "./components/quick-reservation-modal";
import {
    getDocumentNextTypeTranslation,
    getDocumentTypeArticle,
    getDocumentTypeTranslation,
} from "@/lib/utils";
import { DecisionButtons } from "@/Components/decision-buttons";
import {
    collisionCheck,
    deleteDocument,
    forwardDocument,
    getDocumentCollisionCheckData,
} from "@/data/document";

const ReservationTable = ({
    auth,
    reservationList,
    trailers,
    month,
}: ReservationTableProps) => {
    const getMonthList = (month: Date) => {
        setPicker(false);
        router.get(route("reservationTable", format(month, "yyyy-MM")));
    };

    const [picker, setPicker] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentID, setCurrentID] = useState(0);
    const [currentDocumentType, setCurrentDocumentType] = useState("");
    const [documentNr, setDocumentNr] = useState(0);
    const [confirmModal, setConfirmModal] = useState(false);
    const [forward, setForward] = useState(false);

    const togglePicker = () => {
        setPicker(!picker);
    };

    const pageTitle = "Monatsliste";
    const monthDate = isDate(parse(month + "-01", "yyyy-MM-dd", new Date()))
        ? parse(month + "-01", "yyyy-MM-dd", new Date())
        : new Date();

    const displayDate = format(monthDate, "MMMM / yyyy", { locale: de });

    const addDocumentModal = () => {
        setCurrentID(0);
        setCurrentDocumentType("");
        setDocumentNr(0);
        setModalOpen(true);
    };
    const editDocumentModal = (id: number, type: string, Nr: number) => {
        setCurrentID(id);
        setCurrentDocumentType(type);
        setDocumentNr(Nr);
        setModalOpen(true);
    };

    const handleDeleteDocument = (
        id: number,
        documentType: string,
        documentNr: number
    ) => {
        setCurrentID(id);
        setCurrentDocumentType(documentType);
        setDocumentNr(documentNr);
        setForward(false);
        setConfirmModal(true);
    };

    const handleForwardDocument = (
        id: number,
        documentType: string,
        documentNr: number
    ) => {
        setCurrentID(id);
        setCurrentDocumentType(documentType);
        setDocumentNr(documentNr);
        setForward(true);
        setConfirmModal(true);
    };

    const confirm = (id?: number) => {
        if (!id) return;
        if (!forward) {
            // confirm is used to delete or forward a document.
            // if we ware not forwarding we are deleting.
            deleteDocument(id).then(() => {
                router.get(
                    route("reservationTable", format(monthDate, "yyyy-MM")),
                    undefined,
                    { preserveScroll: true }
                );
            });
        } else {
            setConfirmModal(false);
            checkCollision(id);
        }
    };

    const cancelConfirm = () => {
        setConfirmModal(false);
    };

    const checkCollision = (id: number) => {
        getDocumentCollisionCheckData(id).then((data) => {
            data.id = id;
            collisionCheck(data).then((data) => {
                if (data.collision === "no") doForward(id);
                else {
                    // setCollisionId(id);
                    // setCollision(data.collisionData);
                    // setCollisionDialog(true);
                }
            });
        });
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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={pageTitle}
            headerAction={
                <ActionButton
                    label="spontan Reservierung"
                    actionType="add"
                    action={() => {
                        addDocumentModal();
                    }}
                />
            }
            headerCenter={
                <div className="relative flex gap-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="icon"
                                aria-label="Vorheriger Monat"
                                onClick={() =>
                                    getMonthList(subMonths(monthDate, 1))
                                }
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Vorheriger Monat</p>
                        </TooltipContent>
                    </Tooltip>

                    <button
                        onClick={() => togglePicker()}
                        aria-label="Monat auswählen"
                    >
                        {displayDate}
                    </button>
                    {picker ? (
                        <Picker
                            value={monthDate}
                            pickerStyle="month"
                            onPickDate={(date) => {
                                getMonthList(date);
                            }}
                            onClickOutside={() => setPicker(false)}
                        />
                    ) : null}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="icon"
                                aria-label="Nächster Monat"
                                onClick={() =>
                                    getMonthList(addMonths(monthDate, 1))
                                }
                            >
                                <ChevronRight className="h-6 w-6" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Nächster Monat</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            }
        >
            <Head title={pageTitle} />
            <Table
                date={monthDate}
                reservationList={reservationList}
                trailers={trailers}
                documentFunctions={{
                    edit: editDocumentModal,
                    delete: handleDeleteDocument,
                    forward: handleForwardDocument,
                }}
            />
            {confirmModal ? (
                <Modal modalOpen={confirmModal} openChange={setConfirmModal}>
                    <ModalCardWrapper
                        header={
                            !forward ? (
                                <h3 className="font-semibold text-xl text-gray-800">
                                    Dokument löschen
                                </h3>
                            ) : (
                                <h3 className="font-semibold text-xl text-gray-800">
                                    In{" "}
                                    {getDocumentNextTypeTranslation(
                                        currentDocumentType
                                    )}{" "}
                                    umwandeln
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
                                {`Soll ${getDocumentTypeArticle(
                                    currentDocumentType
                                )} ${getDocumentTypeTranslation(
                                    currentDocumentType
                                )} `}
                                <span className="font-bold">
                                    "Nr: {documentNr}"
                                </span>{" "}
                                wirklich gelöscht werden?
                            </p>
                        ) : (
                            <p>
                                {`${getDocumentTypeTranslation(
                                    currentDocumentType
                                )} Nr: `}
                                <span className="font-bold">{documentNr}"</span>
                                {` wirklich in ${getDocumentNextTypeTranslation(
                                    currentDocumentType
                                )} umwandeln?`}
                            </p>
                        )}
                        <p className="flex gap-2">
                            <TriangleAlert className="h-5 w-5  text-destructive" />
                            Diese Aktion kann nicht rückgängig gemacht werden!
                            <TriangleAlert className="h-5 w-5  text-destructive" />
                        </p>
                    </ModalCardWrapper>
                </Modal>
            ) : null}
            {modalOpen ? (
                <Modal
                    className="xl:max-w-[1600px]"
                    modalOpen={modalOpen}
                    openChange={setModalOpen}
                >
                    <ModalCardWrapper>
                        <QuickReservationModal
                            currentMonth={format(monthDate, "yyyy-MM")}
                            currentID={currentID}
                            currentDocumentType={currentDocumentType}
                            currentDocumentNumber={documentNr}
                            close={() => setModalOpen(false)}
                        />
                    </ModalCardWrapper>
                </Modal>
            ) : null}
        </AuthenticatedLayout>
    );
};

export default ReservationTable;
