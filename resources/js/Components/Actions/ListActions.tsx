import { Actions } from "@/types";

import { PrintAction } from "./PrintAction";
import { ForwardAction } from "./ForwardAction";
import { EditAction } from "./EditAction";
import { DeleteAction } from "./DeleteAction";

interface ListActionsProps {
    id: number;
    actions: Actions;
}

export const ListActions = ({ id, actions }: ListActionsProps) => {
    return (
        <div className="flex justify-end gap-4">
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
        </div>
    );
};
