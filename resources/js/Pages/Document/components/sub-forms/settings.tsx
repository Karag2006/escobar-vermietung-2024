import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import { documentType } from "@/types/document";
import { documentSettingsForm } from "@/lib/document-form";

import RichTextEditor from "@/Components/richtext-editor";
import { InputTP24 } from "@/Components/ui/input-tp24";
import { SettingsElement } from "@/Pages/Settings/components/settings-element";

interface SettingsFormProps {
    type: "settings";
    documentType: documentType;
    settings: documentSettingsForm;
    handleChangeInSubForm: (
        subFormKey: string,
        subFormData: documentSettingsForm
    ) => void;
}

export const SettingsForm = ({
    settings,
    type,
    documentType,
    handleChangeInSubForm,
}: SettingsFormProps) => {
    const { data, setData, patch, processing, errors, reset, clearErrors } =
        useForm({
            vat: settings.vat,
            offer_note: settings.offer_note,
            reservation_note: settings.reservation_note,
            contract_note: settings.contract_note,
            contactdata: settings.contactdata,
            document_footer: settings.document_footer,
        });

    const stringToInt = (stringValue: string) => {
        if (stringValue) return parseInt(stringValue);
        return 19;
    };

    const handleChange = (
        e:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>
            | React.FormEvent<HTMLSelectElement>
    ) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;

        if (key === "vat")
            setData((data) => ({
                ...data,
                [key]: stringToInt(value),
            }));
        else
            setData((data) => ({
                ...data,
                [key]: value,
            }));

        handleChangeInSubForm(type, { ...data, [key]: value });
    };

    const handleRichtextChange = (name: string, html: string) => {
        setData((data) => ({
            ...data,
            [name]: html,
        }));
        handleChangeInSubForm(type, { ...data, [name]: html });
    };

    useEffect(() => {
        setData(settings);
    }, [settings]);

    return (
        <div className="flex flex-col gap-4 p-4">
            <SettingsElement label="Umsatzsteuer">
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
            </SettingsElement>
            {documentType === "offer" && (
                <SettingsElement label="Angebot Hinweis-Text">
                    <RichTextEditor
                        value={data.offer_note}
                        onChange={(value) =>
                            handleRichtextChange("offer_note", value)
                        }
                    />
                </SettingsElement>
            )}
            {documentType === "reservation" && (
                <SettingsElement label="Reservierung Hinweis-Text">
                    <RichTextEditor
                        value={data.reservation_note}
                        onChange={(value) =>
                            handleRichtextChange("reservation_note", value)
                        }
                    />
                </SettingsElement>
            )}
            {documentType === "contract" && (
                <SettingsElement label="Mietvertrag Hinweis-Text">
                    <RichTextEditor
                        value={data.contract_note}
                        onChange={(value) =>
                            handleRichtextChange("contract_note", value)
                        }
                    />
                </SettingsElement>
            )}
            <SettingsElement label="Adressdaten">
                <RichTextEditor
                    value={data.contactdata}
                    onChange={(value) =>
                        handleRichtextChange("contactdata", value)
                    }
                />
            </SettingsElement>

            <SettingsElement label="Fußzeile">
                <RichTextEditor
                    value={data.document_footer}
                    onChange={(value) =>
                        handleRichtextChange("document_footer", value)
                    }
                />
            </SettingsElement>
        </div>
    );
};
