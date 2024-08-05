import DataGridTable from "./DataGrid";

const DataGridSkeleton = () => (
    <DataGridTable
        rows={[]}
        columns={[] as any}
        page={0}
        pageSize={0}
        loading
        resource=""
    />
);

export default DataGridSkeleton;
