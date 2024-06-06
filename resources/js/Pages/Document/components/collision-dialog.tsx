import { DecisionButtons } from "@/Components/decision-buttons";
import { Modal } from "@/Components/wrapper/modal";
import { ModalCardWrapper } from "@/Components/wrapper/modal-card-wrapper";
import { getDocumentTypeTranslation } from "@/lib/utils";
import { collisionData } from "@/types/document";

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
                    <h3 className="font-semibold text-xl text-gray-800">
                        Potenzielle Überschneidung!
                    </h3>
                }
                showHeader
                footer={
                    <DecisionButtons
                        yesLabel="Trotzdem Speichern"
                        noLabel="Abbrechen"
                        id={id}
                        yesAction={confirmCollision}
                        noAction={() => setCollisionDialog(false)}
                    />
                }
            >
                <p className=" font-bold">
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
                    {collision.reservationFeePayed ? (
                        <span>
                            {`Anzahlung gezahlt am ${collision.reservationFeeDate}`}
                        </span>
                    ) : (
                        <span>
                            {`Anzahlung noch offen, Zahlung angegeben bis ${collision.reservationFeeDate}`}
                        </span>
                    )}
                </p>
                Das Dokument kann trotzdem gespeichert werden.
            </ModalCardWrapper>
        </Modal>
    );
};
