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
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";

import { ModalCardWrapper } from "@/Components/wrapper/modal-card-wrapper";
import { Modal } from "@/Components/wrapper/modal";
import { QuickReservationModal } from "./components/quick-reservation-modal";

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
        setModalOpen(true);
    };
    const editDocumentModal = (id: number) => {
        setCurrentID(id);
        setModalOpen(true);
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
                    delete: () => {},
                    forward: () => {},
                }}
            />

            <Modal
                className="xl:max-w-[1600px]"
                modalOpen={modalOpen}
                openChange={setModalOpen}
            >
                <ModalCardWrapper>
                    <QuickReservationModal
                        currentID={currentID}
                        close={() => setModalOpen(false)}
                    />
                </ModalCardWrapper>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default ReservationTable;
