import DataGrid from "@/components/DataGrid";
import COLUMNS from "./columns";

export default function PetsTableSkeleton() {
    return (
        <DataGrid
            loading
            columns={COLUMNS}
            rows={[]}
            // ...
            page={0}
            pageSize={10}
            resource="pets"
        />
    );
}
