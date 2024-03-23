import { useState } from "react";
import {
    useTable,
    getComparator,
    emptyRows,
    TableEmptyRows,
    TableHeadCustom,
    TableNoData,
    TablePaginationCustom,
    TableSelectedAction,
} from "../table";
import {
    Card,
    Container,
    Divider,
    IconButton,
    Tab,
    Table,
    TableBody,
    TableContainer,
    Tabs,
    Tooltip,
} from "@mui/material";
import { TableToolbar } from "@/components/StandardTable";
import Scrollbar from "@/components/NavigationBar/scrollbar";
import Iconify from "@/components/iconify";

type TableHeadEntry = {
    id: string;
    label?: string;
    align?: string;
};

type Props<RowType> = {
    head: TableHeadEntry[];
    rows: RowType[];
    CustomTableRow: React.FC<any>; // TODO: real type
};

const STATUS_OPTIONS = ["all", "active", "banned"];

const StandardTable = ({ head, rows, CustomTableRow }: Props<any>) => {
    const {
        dense,
        page,
        order,
        orderBy,
        rowsPerPage,
        setPage,
        //
        selected,
        setSelected,
        onSelectRow,
        onSelectAllRows,
        //
        onSort,
        onChangePage,
        onChangeRowsPerPage,
    } = useTable();

    const [filterName, setFilterName] = useState("");
    const [filterRole] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");

    const dataFiltered = applyFilter({
        inputData: rows,
        comparator: getComparator(order, orderBy),
        filterName,
        filterRole,
        filterStatus,
    });

    const isNotFound =
        (!dataFiltered.length && !!filterName) ||
        (!dataFiltered.length && !!filterRole) ||
        (!dataFiltered.length && !!filterStatus);

    const dataInPage = dataFiltered.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
    );

    const denseHeight = dense ? 52 : 72;

    const handleFilterStatus = (
        event: React.SyntheticEvent<Element, Event>,
        newValue: string,
    ) => {
        setPage(0);
        setFilterStatus(newValue);
    };

    const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleDeleteRow = (id: string) => {
        setSelected([]);

        if (page > 0) {
            if (dataInPage.length < 2) {
                setPage(page - 1);
            }
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleDeleteRows = (selected: string[]) => {
        setSelected([]);

        if (page > 0) {
            if (selected.length === dataInPage.length) {
                setPage(page - 1);
            } else if (selected.length === dataFiltered.length) {
                setPage(0);
            } else if (selected.length > dataInPage.length) {
                const newPage =
                    Math.ceil((rows.length - selected.length) / rowsPerPage) -
                    1;
                setPage(newPage);
            }
        }
    };

    return (
        <Container maxWidth={"lg"}>
            <Card>
                <Tabs
                    value={filterStatus}
                    onChange={handleFilterStatus}
                    sx={{
                        px: 2,
                        bgcolor: "background.neutral",
                    }}
                >
                    {STATUS_OPTIONS.map((tab) => (
                        <Tab key={tab} label={tab} value={tab} />
                    ))}
                </Tabs>

                <Divider />

                <TableToolbar
                    filterName={filterName}
                    onFilterName={handleFilterName}
                />

                <TableContainer
                    sx={{ position: "relative", overflow: "unset" }}
                >
                    <TableSelectedAction
                        dense={dense}
                        numSelected={selected.length}
                        rowCount={rows.length}
                        onSelectAllRows={(checked) =>
                            onSelectAllRows(
                                checked,
                                rows.map((row) => row.id),
                            )
                        }
                        action={
                            <Tooltip title="Delete">
                                <IconButton
                                    color="primary"
                                    // onClick={handleOpenConfirm}
                                >
                                    <Iconify icon="eva:trash-2-outline" />
                                </IconButton>
                            </Tooltip>
                        }
                    />

                    <Scrollbar>
                        <Table
                            size={dense ? "small" : "medium"}
                            sx={{ minWidth: 800 }}
                        >
                            <TableHeadCustom
                                order={order}
                                orderBy={orderBy}
                                headLabel={head}
                                rowCount={rows.length}
                                numSelected={selected.length}
                                onSort={onSort}
                                onSelectAllRows={(checked) =>
                                    onSelectAllRows(
                                        checked,
                                        rows.map((row) => row.id),
                                    )
                                }
                            />

                            <TableBody>
                                {dataFiltered
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage,
                                    )
                                    .map((row) => (
                                        <CustomTableRow
                                            key={row.id}
                                            row={row}
                                            selected={selected.includes(row.id)}
                                            onSelectRow={() =>
                                                onSelectRow(row.id)
                                            }
                                            onDeleteRow={() =>
                                                handleDeleteRow(row.id)
                                            }
                                            onEditRow={
                                                () => console.log("Edit modal")
                                                // handleEditRow(row.name)
                                            }
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={denseHeight}
                                    emptyRows={emptyRows(
                                        page,
                                        rowsPerPage,
                                        rows.length,
                                    )}
                                />

                                <TableNoData isNotFound={isNotFound} />
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </TableContainer>

                <TablePaginationCustom
                    count={dataFiltered.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={onChangePage}
                    onRowsPerPageChange={onChangeRowsPerPage}
                />
            </Card>
        </Container>
    );
};

export default StandardTable;

// ----------------------------------------------------------------------

function applyFilter({
    inputData,
    comparator,
    filterRole,
}: {
    inputData: any[];
    comparator: (a: any, b: any) => number;
    filterName: string;
    filterStatus: string;
    filterRole: string;
}) {
    const stabilizedThis = inputData.map((el, index) => [el, index] as const);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el) => el[0]);

    if (filterRole !== "all") {
        inputData = inputData.filter((user) => user.role === filterRole);
    }

    return inputData;
}
