import { useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { format } from "date-fns";

import { TriangleAlert } from "lucide-react";

import { Actions } from "@/types";
import { TrailerItem } from "@/types/trailer";

import { TuevBatch } from "@/Pages/Trailer/components/tuev-batch";
import { TableCell, TableRow } from "@/Components/ui/table";
import { Modal } from "@/Components/wrapper/modal";
import { ModalCardWrapper } from "@/Components/wrapper/modal-card-wrapper";
import { ListActions } from "@/Components/Actions/ListActions";
import { DecisionButtons } from "@/Components/decision-buttons";
import { deleteTrailerById } from "@/data/trailer";

interface SimpleTrailerTableRowProps {
    trailer: TrailerItem;
}

export const SimpleTrailerTableRow = ({
    trailer,
}: SimpleTrailerTableRowProps) => {
    const [confirmModal, setConfirmModal] = useState(false);

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
            function: (id: number, years: number = 1) => {
                console.log("plusOneYear", id, years);
            },
            tooltip: "TÜV um ein Jahr verlängern",
        },
        plusTwoYears: {
            function: (id: number, years: number = 2) => {
                console.log("plusTwoYear", id, years);
            },
            tooltip: "TÜV um zwei Jahre verlängern",
        },
    };

    const deleteModal = () => {
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

    const cancelDelete = () => {
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
                        <DecisionButtons
                            yesLabel="Löschen"
                            noLabel="Abbrechen"
                            id={trailer.id ? trailer.id : 0}
                            yesAction={confirmDelete}
                            noAction={cancelDelete}
                        />
                    }
                >
                    <p>
                        Soll der Anhänger mit dem Kennzeichen{" "}
                        <span className="font-bold">
                            "{trailer.plateNumber}"
                        </span>{" "}
                        wirklich gelöscht werden?
                    </p>
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
