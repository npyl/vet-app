"use client";

import { useCallback, useState } from "react";
import Pagination from "@/components/Pagination";
import StyledList from "./styled";
import AppointmentItem from "@/components/Appointments/AppointmentItem";
import { IAppointment } from "@/types/appointment";

const PAGE_SIZE = 5;

interface Props {
    appointments: IAppointment[];
}

const PaginatedList = ({ appointments }: Props) => {
    const [page, setPage] = useState(1);
    const handlePageChange = useCallback((_: any, p: number) => setPage(p), []);

    return (
        <Pagination
            page={page}
            pageSize={PAGE_SIZE}
            onChange={handlePageChange}
            Container={StyledList}
        >
            {appointments.map((a) => (
                <AppointmentItem key={a.id} a={a} noPet variant="USER" />
            ))}
        </Pagination>
    );
};

export default PaginatedList;
