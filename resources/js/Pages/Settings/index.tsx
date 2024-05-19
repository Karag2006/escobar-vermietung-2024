import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";

import { SettingProps } from "@/types/settings";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { ActionButton } from "@/Components/action-button";
import { DecisionButtons } from "@/Components/decision-buttons";
import RichTextEditor from "@/Components/richtext-editor";
import { InputTP24 } from "@/Components/ui/input-tp24";

import { SettingsElement } from "./components/settings-element";
import { CollectAddresses } from "./components/collect-addresses";
import { LicenseClasses } from "./components/license-classes";
import { PaymentTypes } from "./components/payment-types";

export default function User({
    auth,
    settings,
    collectAddressList,
}: SettingProps) {
    const pageTitle = "Einstellungen";
    const [edit, setEdit] = useState(false);
    const { data, setData, patch, processing, errors, reset, clearErrors } =
        useForm({
            id: settings.id,
            vat: settings.vat,
            offer_note: settings.offer_note,
            reservation_note: settings.reservation_note,
            contract_note: settings.contract_note,
            contactdata: settings.contactdata,
            document_footer: settings.document_footer,
        });

    const handleChange = (
        e:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>
            | React.FormEvent<HTMLSelectElement>
    ) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;
        setData((data) => ({
            ...data,
            [key]: value,
        }));
    };
    const handleRichtextChange = (name: string, html: string) => {
        setData((data) => ({
            ...data,
            [name]: html,
        }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        patch(`/settings/1`, {
            only: ["settings", "errors"],
            onSuccess: () => {
                toast.success("Einstellungen erfolgreich geändert");
                setEdit(false);
            },
            onError: () => {
                toast.error("Fehler beim ändern der Einstellungen");
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={pageTitle}
            headerAction={
                <ActionButton
                    label="Bearbeiten"
                    actionType="default"
                    action={() => setEdit(true)}
                />
            }
        >
            <Head title={pageTitle} />
            <div className="flex flex-col gap-16">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <SettingsElement label="Umsatzsteuer">
                        {!edit && <div>{`${settings.vat} %`}</div>}
                        {edit && (
                            <InputTP24
                                className="max-w-12"
                                id="vat"
                                value={data.vat}
                                error={errors.vat}
                                onChange={handleChange}
                                onFocus={() => clearErrors("vat")}
                                disabled={processing}
                                suffix="%"
                            />
                        )}
                    </SettingsElement>
                    <SettingsElement label="Angebot Hinweis-Text">
                        {!edit && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: settings.offer_note,
                                }}
                            ></div>
                        )}
                        {edit && (
                            <RichTextEditor
                                value={data.offer_note}
                                onChange={(value) =>
                                    handleRichtextChange("offer_note", value)
                                }
                            />
                        )}
                    </SettingsElement>
                    <SettingsElement label="Reservierung Hinweis-Text">
                        {!edit && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: settings.reservation_note,
                                }}
                            ></div>
                        )}
                        {edit && (
                            <RichTextEditor
                                value={data.reservation_note}
                                onChange={(value) =>
                                    handleRichtextChange(
                                        "reservation_note",
                                        value
                                    )
                                }
                            />
                        )}
                    </SettingsElement>
                    <SettingsElement label="Mietvertrag Hinweis-Text">
                        {!edit && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: settings.contract_note,
                                }}
                            ></div>
                        )}
                        {edit && (
                            <RichTextEditor
                                value={data.contract_note}
                                onChange={(value) =>
                                    handleRichtextChange("contract_note", value)
                                }
                            />
                        )}
                    </SettingsElement>
                    <SettingsElement label="Adressdaten">
                        {!edit && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: settings.contactdata,
                                }}
                            ></div>
                        )}
                        {edit && (
                            <RichTextEditor
                                value={data.contactdata}
                                onChange={(value) =>
                                    handleRichtextChange("contactdata", value)
                                }
                            />
                        )}
                    </SettingsElement>

                    <SettingsElement label="Fußzeile">
                        {!edit && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: settings.document_footer,
                                }}
                            ></div>
                        )}
                        {edit && (
                            <RichTextEditor
                                value={data.document_footer}
                                onChange={(value) =>
                                    handleRichtextChange(
                                        "document_footer",
                                        value
                                    )
                                }
                            />
                        )}
                    </SettingsElement>
                    {edit && (
                        <DecisionButtons
                            yesLabel="Speichern"
                            noLabel="Abbrechen"
                            sendForm
                            noAction={() => setEdit(false)}
                        />
                    )}
                </form>

                <SettingsElement label="Führerschein Klassen">
                    <LicenseClasses
                        // settings.license_classes is a JSON encoded String
                        // representing an array of strings.
                        classes={JSON.parse(settings.license_classes)}
                    />
                </SettingsElement>
                <SettingsElement label="Zahlungsarten">
                    <PaymentTypes
                        // settings.payment_types is a JSON encoded String
                        // representing an array of strings.
                        types={JSON.parse(settings.payment_types)}
                    />
                </SettingsElement>
                <SettingsElement label="Abholadressen">
                    <CollectAddresses collectAddresses={collectAddressList} />
                </SettingsElement>
            </div>
        </AuthenticatedLayout>
    );
}
