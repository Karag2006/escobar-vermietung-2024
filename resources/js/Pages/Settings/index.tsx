import { useEffect, useState } from "react";
import { Head, useForm } from "@inertiajs/react";

import { TriangleAlert } from "lucide-react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { DataTable } from "@/Components/data-table";
import { ActionButton } from "@/Components/action-button";
import { Modal } from "@/Components/wrapper/modal";
import { ModalCardWrapper } from "@/Components/wrapper/modal-card-wrapper";
import { DecisionButtons } from "@/Components/decision-buttons";

import { SettingProps } from "@/types/settings";
import { getSettings } from "@/data/settings";

import { toast } from "sonner";

export default function User({ auth, settings }: SettingProps) {
    const pageTitle = "Einstellungen";
    const [confirmModal, setConfirmModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const {
        data,
        setData,
        post,
        patch,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        id: settings.id,
        vat: settings.vat,
        offer_note: settings.offer_note,
        reservation_note: settings.reservation_note,
        contract_note: settings.contract_note,
        contactdata: settings.contactdata,
        document_footer: settings.document_footer,
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={pageTitle}
            headerAction={
                <ActionButton
                    label="Bearbeiten"
                    actionType="add"
                    action={() => {}}
                />
            }
        >
            <Head title={pageTitle} />

            <div
                dangerouslySetInnerHTML={{ __html: settings.contactdata }}
            ></div>
        </AuthenticatedLayout>
    );
}
