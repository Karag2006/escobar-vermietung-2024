import { DecisionButtons } from "@/Components/decision-buttons";
import { Modal } from "@/Components/wrapper/modal";
import { ModalCardWrapper } from "@/Components/wrapper/modal-card-wrapper";
import { getDocumentTypeTranslation } from "@/lib/utils";
import { collisionData } from "@/types/document";
import { AlertTriangle } from "lucide-react";

interface CollisionDialogProps {
    id: number;
    collision: collisionData;
    confirmCollision: (id?: number) => void;
    setCollisionDialog: (state: boolean) => void;
}

export const CollisionDialog = ({
    id,
    collision,
    confirmCollision,
    setCollisionDialog,
}: CollisionDialogProps) => {
    return (
        <Modal modalOpen={true} openChange={setCollisionDialog}>
            <ModalCardWrapper
                header={
                    <div className="flex gap-4 items-center">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                        <h3 className="font-semibold text-xl text-gray-800">
                            Achtung Überschneidung!
                        </h3>
                    </div>
                }
                showHeader
            >
                <div className="flex flex-col gap-4 font-bold">
                    <p>
                        Details : <br />
                        {`${getDocumentTypeTranslation(
                            collision.documentType
                        )} Nummer ${collision.documentNumber}`}
                        <br />
                        {`Kunde : ${collision.customerName}`}
                        <br />
                        {`Von : ${collision.startDate} - ${collision.startTime}`}
                        <br />
                        {`Bis : ${collision.endDate} - ${collision.endTime}`}
                        <br />
                        {collision.reservationFeePayed &&
                        collision.reservationFeeDate ? (
                            <span>
                                {`Anzahlung gezahlt am ${collision.reservationFeeDate}`}
                            </span>
                        ) : collision.reservationFeeDate ? (
                            <span>
                                {`Anzahlung noch offen, Zahlung angegeben bis ${collision.reservationFeeDate}`}
                            </span>
                        ) : (
                            ""
                        )}
                    </p>

                    <p>
                        Mögliche Lösungen:
                        <br />
                        Anhänger Wechseln:
                    </p>
                </div>
            </ModalCardWrapper>
        </Modal>
    );
};
