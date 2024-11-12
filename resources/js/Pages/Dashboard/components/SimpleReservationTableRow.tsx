import { useState } from "react";
import { format } from "date-fns";

import { Document } from "@/types/document";

import { TableCell, TableRow } from "@/Components/ui/table";

import { ListActions } from "@/Components/Actions/ListActions";
import { Actions } from "@/types";
import { Modal } from "@/Components/wrapper/modal";
import { ModalCardWrapper } from "@/Components/wrapper/modal-card-wrapper";
import { DecisionButtons } from "@/Components/decision-buttons";
import { TriangleAlert } from "lucide-react";
import {
    getDocumentNextTypeTranslation,
    getDocumentTypeArticle,
    getDocumentTypeTranslation,
} from "@/lib/utils";
import {
    archiveDocument,
    deleteDocument,
    forwardDocument,
} from "@/data/document";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

interface SimpleReservationTableRowProps {
    reservation: Document;
    actions: Actions;
}

export const SimpleReservationTableRow = ({
    reservation,
    actions,
}: SimpleReservationTableRowProps) => {
    const [confirmModal, setConfirmModal] = useState(false);
    const [forward, setForward] = useState(false);

    const localActions = {
        ...actions,
        forward: {
            function: (id: number) => {
                setForward(true);
                setConfirmModal(true);
            },
            tooltip: "in Mietvertrag umwandeln",
        },
        delete: {
            function: (id: number) => {
                setForward(false);
                setConfirmModal(true);
            },
            tooltip: "Reservierung löschen",
        },
        archive: {
            function: async (document: Document) => {
                const data = await archiveDocument(
                    document.id ? document.id : 0
                );
                if (data.is_archived) {
                    toast.success(`Reservierung archiviert`);
                    router.reload({
                        only: ["nextReservations"],
                    });
                }
            },
            tooltip: "Reservierung archivieren",
        },
    };

    const confirm = async (id?: number) => {
        if (!id) return;
        let data;
        if (forward) {
            data = await forwardDocument(id);
            if (data && data.id) {
                toast.success(
                    "Reservierung erfolgreich in Mietvertrag umgewandelt"
                );
                router.get(
                    `/${data.current_state}`,
                    {},
                    {
                        headers: {
                            forwardDocument: data.id,
                        },
                    }
                );
            }
        } else {
            data = await deleteDocument(id);
            if (data && data.status === "deleted") {
                toast.success("Reservierung erfolgreich gelöscht");
                router.reload({
                    only: ["nextReservations"],
                });
            }
        }
        setConfirmModal(false);
        console.log("Result: ", data);
    };

    const cancelConfirm = () => {
        setConfirmModal(false);
    };

    const documentName = reservation.reservation_number;
    const germanDocumentType = getDocumentTypeTranslation(
        reservation.current_state
    );
    const germanDocumentTypeArticle = getDocumentTypeArticle(
        reservation.current_state
    );
    const germanDocumentNextType = getDocumentNextTypeTranslation(
        reservation.current_state
    );

    if (!reservation) return null;
    if (!reservation.id) return null;
    return (
        <>
            <TableRow key={reservation.id}>
                <TableCell>{reservation.reservation_number}</TableCell>
                <TableCell>{reservation.vehicle_plateNumber}</TableCell>
                <TableCell>{reservation.customer_name1}</TableCell>
                <TableCell>
                    {reservation.collect_at
                        ? format(reservation.collect_at, "dd.MM.yyyy HH:mm")
                        : null}
                </TableCell>
                <TableCell>
                    {reservation.return_at
                        ? format(reservation.return_at, "dd.MM.yyyy HH:mm")
                        : null}
                </TableCell>
                <TableCell>
                    {reservation.collect_address.name
                        ? reservation.collect_address.name
                        : null}
                </TableCell>
                <TableCell>
                    <ListActions
                        document={reservation}
                        id={reservation.id}
                        actions={localActions}
                    />
                </TableCell>
            </TableRow>
            <Modal modalOpen={confirmModal} openChange={setConfirmModal}>
                <ModalCardWrapper
                    header={
                        !forward ? (
                            <h3 className="font-semibold text-xl text-gray-800">
                                Reservierung löschen
                            </h3>
                        ) : (
                            <h3 className="font-semibold text-xl text-gray-800">
                                In Mietvertrag umwandeln
                            </h3>
                        )
                    }
                    showHeader
                    footer={
                        <DecisionButtons
                            yesLabel={!forward ? "Löschen" : "Umwandeln"}
                            noLabel="Abbrechen"
                            id={reservation.id}
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
        </>
    );
};
