import { useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { addYears, format, set, startOfMonth } from "date-fns";

import { TriangleAlert } from "lucide-react";

import { Actions } from "@/types";
import { TrailerItem } from "@/types/trailer";

import { TuevBatch } from "@/Pages/Trailer/components/tuev-batch";
import { TableCell, TableRow } from "@/Components/ui/table";
import { Modal } from "@/Components/wrapper/modal";
import { ModalCardWrapper } from "@/Components/wrapper/modal-card-wrapper";
import { ListActions } from "@/Components/Actions/ListActions";
import { DecisionButtons } from "@/Components/decision-buttons";
import { deleteTrailerById, updateInspectionDate } from "@/data/trailer";

interface SimpleTrailerTableRowProps {
    trailer: TrailerItem;
}

export const SimpleTrailerTableRow = ({
    trailer,
}: SimpleTrailerTableRowProps) => {
    const [confirmModal, setConfirmModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState("delete");
    const [inspectionAddYears, setInspectionAddYears] = useState<1 | 2>(1);

    // 04.11.2024 Feature: Inspection List
    // Adding actions to the table row
    const actions: Actions = {
        edit: {
            function: (id: number) => {
                // Move the user to the trailer Page
                // and open the edit form
                router.get(
                    route("trailer"),
                    {},
                    {
                        // Tell the trailer page to open the edit form for the trailer with id: id
                        headers: {
                            openEdit: "" + id,
                        },
                    }
                );
            },
            tooltip: "Anhänger bearbeiten",
        },
        delete: {
            function: (id: number) => {
                deleteModal();
            },
            tooltip: "Anhänger löschen",
        },
        plusOneYear: {
            function: (id: number, years: 1) => {
                plusYears(id, years);
            },
            tooltip: "TÜV um ein Jahr verlängern",
        },
        plusTwoYears: {
            function: (id: number, years: 2) => {
                plusYears(id, years);
            },
            tooltip: "TÜV um zwei Jahre verlängern",
        },
    };

    const plusYears = (id: number, years: 1 | 2) => {
        setInspectionAddYears(years);
        setConfirmAction("plusYears");
        setConfirmModal(true);
    };

    const plusYearsConfirm = async (id: number) => {
        const result = await updateInspectionDate(id, inspectionAddYears);
        if (result) {
            setConfirmModal(false);
            toast.success("TÜV Datum wurde aktualisiert");
            router.reload({ only: ["nextDueTrailers"] });
        }
    };

    const deleteModal = () => {
        setConfirmAction("delete");
        setConfirmModal(true);
    };

    const confirmDelete = async (id?: number) => {
        const result = await deleteTrailerById(id ? id : 0);
        if (result) {
            console.log(result);
            toast.success("Anhänger wurde gelöscht");
            router.reload({ only: ["nextDueTrailers"] });
        }
        setConfirmModal(false);
    };

    const cancelConfirm = () => {
        setConfirmModal(false);
    };

    if (!trailer) return null;
    if (!trailer.inspection_at) return null;
    const tuevDate = format(trailer.inspection_at, "MM/yy");

    return (
        <>
            <TableRow>
                <TableCell>{trailer.title}</TableCell>
                <TableCell>{trailer.plateNumber}</TableCell>
                <TableCell>
                    <TuevBatch tuev={tuevDate} />
                </TableCell>
                <TableCell>
                    <ListActions
                        actions={actions}
                        id={trailer.id ? trailer.id : 0}
                    />
                </TableCell>
            </TableRow>
            <Modal modalOpen={confirmModal} openChange={setConfirmModal}>
                <ModalCardWrapper
                    header={
                        <h3 className="font-semibold text-xl text-gray-800">
                            Anhänger löschen
                        </h3>
                    }
                    showHeader
                    footer={
                        confirmAction === "delete" ? (
                            <DecisionButtons
                                yesLabel="Löschen"
                                noLabel="Abbrechen"
                                id={trailer.id ? trailer.id : 0}
                                yesAction={confirmDelete}
                                noAction={cancelConfirm}
                            />
                        ) : (
                            <DecisionButtons
                                yesLabel="Setzen"
                                noLabel="Abbrechen"
                                id={trailer.id ? trailer.id : 0}
                                yesAction={() =>
                                    plusYearsConfirm(
                                        trailer.id ? trailer.id : 0
                                    )
                                }
                                noAction={cancelConfirm}
                            />
                        )
                    }
                >
                    {confirmAction === "delete" ? (
                        <>
                            <p>
                                Soll der Anhänger mit dem Kennzeichen{" "}
                                <span className="font-bold">
                                    "{trailer.plateNumber}"
                                </span>{" "}
                                wirklich gelöscht werden?
                            </p>
                            <p className="flex gap-2">
                                <TriangleAlert className="h-5 w-5  text-destructive" />
                                Diese Aktion kann nicht rückgängig gemacht
                                werden!
                                <TriangleAlert className="h-5 w-5  text-destructive" />
                            </p>
                        </>
                    ) : (
                        <p>
                            Soll der nächste Tüv Termin für den Anhänger{" "}
                            <span className="font-bold">
                                "{trailer.plateNumber}"
                            </span>{" "}
                            wirklich auf{" "}
                            <span className="font-bold">
                                {format(
                                    addYears(
                                        startOfMonth(new Date()),
                                        inspectionAddYears
                                    ),
                                    '"MM / yy"'
                                )}{" "}
                            </span>
                            gesetzt werden?
                        </p>
                    )}
                </ModalCardWrapper>
            </Modal>
        </>
    );
};
