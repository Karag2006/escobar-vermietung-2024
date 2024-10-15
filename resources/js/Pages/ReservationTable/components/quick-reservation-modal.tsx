import { CollectAddressItem, SelectorItem } from "@/types/document";

import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";

import { getSettings } from "@/data/settings";

import { blankForm } from "@/lib/document-form";
import { getCustomerById, getCustomerSelectors } from "@/data/customer";
import { getTrailerById, getTrailerSelectors } from "@/data/trailer";
import { getCollectAddresses } from "@/data/document";
import { SelectorCombobox } from "@/Components/selector-combobox";
import { PickerReturn } from "@/types";
import { InputTP24 } from "@/Components/ui/input-tp24";
import { AddressCombobox } from "@/Pages/Document/components/address-combobox";
import { DatePicker } from "@/Components/datePicker";
import { TimePicker } from "@/Components/time-picker";
import { CurrencyInput } from "@/Pages/Document/components/currency-input";
import {
    calculateValues,
    floatToString,
    stringToFloat,
} from "@/lib/curency-functions";
import { set } from "date-fns";

interface QuickReservationModalProps {
    currentID: number;
    close: () => void;
}

export const QuickReservationModal = ({
    currentID,
    close,
}: QuickReservationModalProps) => {
    const { data, setData, post, patch, processing } = useForm(blankForm);
    const [customerList, setCustomerList] = useState<SelectorItem[]>([]);
    const [localCustomerId, setLocalCustomerId] = useState(0);
    const [trailerList, setTrailerList] = useState<SelectorItem[]>([]);
    const [localTrailerId, setLocalTrailerId] = useState(0);
    const [collectAdresses, setCollectAdresses] = useState<
        CollectAddressItem[]
    >([]);

    const handleCustomerChange = (
        e:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>
            | React.FormEvent<HTMLSelectElement>
    ) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;
        setData((data) => ({
            ...data,
            customer: {
                ...data.customer,
                [key]: value,
            },
        }));
    };

    const handleCustomerPickerChange = (result: PickerReturn) => {
        const key = result.id;
        const value = result.value;
        setData((data) => ({
            ...data,
            customer: {
                ...data.customer,
                [key]: value,
            },
        }));
    };

    const handleTrailerChange = (
        e:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>
            | React.FormEvent<HTMLSelectElement>
    ) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;
        setData((data) => ({
            ...data,
            trailer: {
                ...data.trailer,
                [key]: value,
            },
        }));
    };

    const handleTrailerPickerChange = (result: PickerReturn) => {
        const key = result.id;
        const value = result.value;
        setData((data) => ({
            ...data,
            trailer: {
                ...data.trailer,
                [key]: value,
            },
        }));
    };

    const handleDataPickerChange = (result: PickerReturn) => {
        const key = result.id;
        const value = result.value;
        setData((data) => ({
            ...data,
            data: {
                ...data.data,
                [key]: value,
            },
        }));
    };

    const handleDataChange = (
        e:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>
            | React.FormEvent<HTMLSelectElement>
    ) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;
        setData((data) => ({
            ...data,
            data: {
                ...data.data,
                [key]: value,
            },
        }));
    };

    const handleCurrencyInput = (e: React.FormEvent<HTMLInputElement>) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;

        setData((data) => ({
            ...data,
            data: {
                ...data.data,
                [key]: stringToFloat(value),
            },
        }));
    };

    const handleCurrencyValueChanged = (
        e: React.FormEvent<HTMLInputElement>
    ) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;

        if (key === "total_price") {
            const values = calculateValues(
                stringToFloat(value),
                data.data.reservation_deposit_value
                    ? data.data.reservation_deposit_value
                    : 0.0,
                data.settings.vat,
                false
            );
            setData((data) => ({
                ...data,
                data: {
                    ...data.data,
                    total_price: values.totalValue,
                    reservation_deposit_value: values.depositValue
                        ? values.depositValue
                        : 0.0,
                    netto_price: values.netValue ? values.netValue : 0.0,
                    tax_value: values.vatValue ? values.vatValue : 0.0,
                    final_payment_value: values.finalPayment
                        ? values.finalPayment
                        : 0.0,
                },
            }));
        }
    };

    useEffect(() => {
        getSettings().then((settings) =>
            setData((data) => ({
                ...data,
                settings: settings,
            }))
        );
        getCustomerSelectors().then((data) => {
            setCustomerList(data);
        });
        getTrailerSelectors().then((data) => {
            setTrailerList(data);
        });
        getCollectAddresses().then((data) => {
            setCollectAdresses(data);
        });
    }, []);

    useEffect(() => {
        const getCurrentCustomer = () => {
            if (data.customer.id > 0 && localCustomerId !== data.customer.id) {
                getCustomerById(data.customer.id).then((customer) => {
                    setLocalCustomerId(data.customer.id);
                    setData((data) => ({
                        ...data,
                        customer: { ...customer },
                    }));
                });
            }
        };
        getCurrentCustomer();
    }, [data.customer.id]);

    useEffect(() => {
        const getCurrentTrailer = () => {
            if (data.trailer.id > 0 && localTrailerId !== data.trailer.id) {
                getTrailerById(data.trailer.id).then((trailer) => {
                    setLocalTrailerId(data.trailer.id);
                    setData((data) => ({
                        ...data,
                        trailer: { ...trailer },
                    }));
                });
            }
        };
        getCurrentTrailer();
    }, [data.trailer.id]);

    return (
        <div className="p-4 w-full flex flex-col gap-8">
            <div className="flex gap-6 flex-col lg:flex-row lg:justify-between">
                <DatePicker
                    value={data.data.collect_date}
                    id="collect_date"
                    label="Abholung - Datum *"
                    fieldName="collect_date"
                    onUpdateValue={handleDataPickerChange}
                />
                <TimePicker
                    value={data.data.collect_time}
                    id="collect_time"
                    label="Abholung - Uhrzeit *"
                    fieldName="collect_time"
                    onUpdateValue={handleDataPickerChange}
                />
                <DatePicker
                    value={data.data.return_date}
                    id="return_date"
                    label="Rückgabe - Datum *"
                    fieldName="return_date"
                    onUpdateValue={handleDataPickerChange}
                />
                <TimePicker
                    value={data.data.return_time}
                    id="return_time"
                    label="Rückgabe - Uhrzeit *"
                    fieldName="return_time"
                    onUpdateValue={handleDataPickerChange}
                />
            </div>
            <div className="flex gap-8">
                <InputTP24
                    className="md:w-[calc(50%-1.25rem)]"
                    label="Name des Kunden"
                    id="name1"
                    value={data.customer.name1}
                    onChange={handleCustomerChange}
                    disabled={processing}
                />
                <span>oder: </span>
                <div className="md:w-[calc(50%-1.25rem)]">
                    <SelectorCombobox
                        id="id"
                        value={data.customer.id}
                        items={customerList}
                        onValueChange={handleCustomerPickerChange}
                        label={"Kunden auswählen"}
                    />
                </div>
            </div>
            <div className="flex gap-8">
                <div className="md:w-[calc(50%-1.25rem)]">
                    <SelectorCombobox
                        id="id"
                        value={data.trailer.id}
                        items={trailerList}
                        onValueChange={handleTrailerPickerChange}
                        label={"Anhänger auswählen"}
                    />
                </div>
            </div>
            <div className="flex gap-8 justify-between">
                <CurrencyInput
                    className="w-[20rem]"
                    id="total_price"
                    value={floatToString(data.data.total_price)}
                    label="Preis (Brutto) *"
                    onValueChange={handleCurrencyInput}
                    onFinishedValueChange={handleCurrencyValueChanged}
                />
                <AddressCombobox
                    className="w-[20rem]"
                    items={collectAdresses}
                    label="Abhol Anschrift *"
                    id="collect_address_id"
                    value={data.data.collect_address_id}
                    onValueChange={handleDataPickerChange}
                />
            </div>
        </div>
    );
};
