import { Actions } from "@/types";

import { PrintAction } from "./PrintAction";
import { ForwardAction } from "./ForwardAction";
import { EditAction } from "./EditAction";
import { DeleteAction } from "./DeleteAction";
import { ArchiveAction } from "./ArchiveAction";
import { Document } from "@/types/document";
import { PlusYears } from "./PlusYears";

interface ListActionsProps {
    document?: Document;
    id: number;
    actions: Actions;
}

export const ListActions = ({ document, id, actions }: ListActionsProps) => {
    return (
        <div className="flex justify-end gap-4">
            {actions.plusOneYear ? (
                <PlusYears
                    id={id}
                    years={1}
                    // @ts-ignore
                    plusYears={actions.plusOneYear.function}
                    tooltip={actions.plusOneYear.tooltip}
                />
            ) : null}

            {actions.plusTwoYears ? (
                <PlusYears
                    id={id}
                    years={2}
                    // @ts-ignore
                    plusYears={actions.plusTwoYears.function}
                    tooltip={actions.plusTwoYears.tooltip}
                />
            ) : null}

            {actions.print ? (
                <PrintAction
                    id={id}
                    print={actions.print.function}
                    tooltip={actions.print.tooltip}
                />
            ) : null}
            {actions.forward ? (
                <ForwardAction
                    id={id}
                    forward={actions.forward.function}
                    tooltip={actions.forward.tooltip}
                />
            ) : null}
            {actions.edit ? (
                <EditAction
                    id={id}
                    edit={actions.edit.function}
                    tooltip={actions.edit.tooltip}
                />
            ) : null}
            {actions.delete ? (
                <DeleteAction
                    id={id}
                    erase={actions.delete.function}
                    tooltip={actions.delete.tooltip}
                />
            ) : null}
            {/* requiring document to display this item so document can be optional on the component interface */}
            {actions.archive && document ? (
                <ArchiveAction
                    document={document}
                    archive={actions.archive.function}
                    tooltip={actions.archive.tooltip}
                />
            ) : null}
        </div>
    );
};
