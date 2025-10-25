import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataReports } from "../../data/mockData"; // updated mock data
import Header from "../../components/Header";

const Reports = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "crowdsource",
      headerName: "Crowdsource",
      flex: 1,
      cellClassName: "crowdsource-column--cell",
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "emergency",
      headerName: "Emergency",
      flex: 1,
      renderCell: (params) => (
        <Typography color={params.value.startsWith("Yes") ? colors.redAccent[500] : colors.greenAccent[500]}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "occurrence",
      headerName: "Occurrence",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="ISSUED REPORTS" subtitle="Crowdsourced incident details" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .crowdsource-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
          "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataReports} columns={columns} />
      </Box>
    </Box>
  );
};

export default Reports;

