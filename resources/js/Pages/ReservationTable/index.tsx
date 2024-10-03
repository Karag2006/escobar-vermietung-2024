import { ReservationTableProps } from "@/types/document";

const ReservationTable = ({ auth, reservationList }: ReservationTableProps) => {
    console.log(reservationList);
    return <div>Reservation Table</div>;
};

export default ReservationTable;
