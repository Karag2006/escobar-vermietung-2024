import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";

import { CollectAddressItem } from "@/types/collect-address";

import { getAddressById } from "@/data/collect-address";

import { Modal } from "@/Components/wrapper/modal";
import { ModalCardWrapper } from "@/Components/wrapper/modal-card-wrapper";
import { DecisionButtons } from "@/Components/decision-buttons";

import { DataTable } from "./data-table";
import { columns } from "./columns";

interface CollectAddressesProps {
    collectAddresses: CollectAddressItem[];
}

export const CollectAddresses = ({
    collectAddresses,
}: CollectAddressesProps) => {
    const [confirmModal, setConfirmModal] = useState(false);

    const [currentID, setCurrentID] = useState(0);
    const [deleteName, setDeleteName] = useState("");
    const Form = useForm({
        id: currentID,
    });

    const deleteModal = (id: number) => {
        setCurrentID(id);
        getAddressById(id).then((address) => {
            setDeleteName(address.name);
        });
        setConfirmModal(true);
    };

    const cancelDelete = () => {
        setConfirmModal(false);
    };

    const confirmDelete = (id?: number) => {
        Form.delete(`/collectaddress/${id}`, {
            only: ["collectAddressList"],
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Adresse gelöscht");
                setConfirmModal(false);
            },
        });
    };

    return (
        <>
            <DataTable
                columns={columns}
                data={collectAddresses}
                deleteModal={deleteModal}
            />
            <Modal modalOpen={confirmModal} openChange={setConfirmModal}>
                <ModalCardWrapper
                    header={
                        <h3 className="font-semibold text-xl text-gray-800">
                            Adresse löschen
                        </h3>
                    }
                    showHeader
                    footer={
                        <DecisionButtons
                            yesLabel="Löschen"
                            noLabel="Abbrechen"
                            id={currentID}
                            yesAction={confirmDelete}
                            noAction={cancelDelete}
                        />
                    }
                >
                    <p>
                        Soll die Adresse{" "}
                        <span className="font-bold">"{deleteName}"</span>{" "}
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
