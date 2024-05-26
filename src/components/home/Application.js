import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Fab,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ApplicationFilterSelect from "../inputs/PlaceHolder";
import { addApplication } from "../services/AddApplication";
import { deleteApplication } from "../services/DeleteApplication";
import { updateApplication } from "../services/EditApplication";
import { fetchApplications } from "../services/ReadApplication";
import SearchByFlightAndDate from "../services/SearchByFlightAndDate";
import EnterDialog from "../inputs/EnterApplication";
import Dialog from "@mui/material/Dialog";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export default function ReadApplication({ setSelectedDestination }) {
  const [applications, setApplication] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [handleSave, setHandleSave] = useState(null);
  const [currentApplication, setCurrentApplication] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchApplications(setApplication);
  }, []);

  const handleAdd = () => {
    setCurrentApplication(null);
    setOpenDialog(true);
    setHandleSave(() => handleAddSave);
  };

  const handleDelete = (id) => {
    deleteApplication(id).then(() => {
      fetchApplications(setApplication);
    });
  };

  const handleEdit = (application) => {
    setCurrentApplication(application);
    setOpenDialog(true);
    setHandleSave(() => handleUpdateSave);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleUpdateSave = (updatedApplication) => {
    const updatedData = {
      destination: updatedApplication.destination,
      flightNumber: updatedApplication.flightNumber,
      passengerName: updatedApplication.passengerName,
      departureDate: updatedApplication.departureDate,
    };
    updateApplication(updatedApplication.id, updatedData).then(() => {
      fetchApplications(setApplication);
      handleClose();
    });
  };

  const handleAddSave = (addedApplication) => {
    const addedData = {
      destination: addedApplication.destination,
      flightNumber: addedApplication.flightNumber,
      passengerName: addedApplication.passengerName,
      departureDate: addedApplication.departureDate,
    };
    addApplication(addedData).then(() => {
      fetchApplications(setApplication);
      handleClose();
    });
  };

  const handleFilterChange = (filter) => {
    switch (filter) {
      case "sortByDestination":
        setApplication((prevApps) =>
          [...prevApps].sort((a, b) =>
            a.destination.localeCompare(b.destination)
          )
        );
        break;
      case "sortByDepartureDate":
        setApplication((prevApps) =>
          [...prevApps].sort(
            (a, b) => new Date(a.departureDate) - new Date(b.departureDate)
          )
        );
        break;
      default:
        fetchApplications(setApplication);
        break;
    }
  };

  const handleSearch = ({ flightNumber, departureDate }) => {
    fetchApplications((applications) => {
      let filteredApplications = [];

      for (const app of applications) {
        const appDepartureDate = dayjs(app.departureDate);

        if (flightNumber && departureDate) {
          const formattedDepartureDate = dayjs(departureDate);
          if (
            app.flightNumber === flightNumber &&
            appDepartureDate.isSame(formattedDepartureDate, "day")
          ) {
            filteredApplications.push(app);
          }
        } else if (flightNumber) {
          if (app.flightNumber === flightNumber) {
            filteredApplications.push(app);
          }
        } else if (departureDate) {
          const formattedDepartureDate = dayjs(departureDate);
          if (appDepartureDate.isSame(formattedDepartureDate, "day")) {
            filteredApplications.push(app);
          }
        } else {
          filteredApplications = applications;
          break;
        }
      }

      setApplication(filteredApplications);
    });
  };

  const handleRowClick = (destination) => {
    setSelectedDestination(destination);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRowEvent = (event, destination) => {
    if (
      event.target.tagName !== "BUTTON" &&
      event.target.tagName !== "svg" &&
      event.target.tagName !== "path"
    ) {
      handleRowClick(destination);
    }
  };

  return (
    <TableContainer
      component={Box}
      style={{ width: "85%", margin: "40px auto", padding: "15px" }}
    >
      <Box display="flex" justifyContent="space-between" mb={2}>
        <SearchByFlightAndDate onSearch={handleSearch} />
        <ApplicationFilterSelect onSelectChange={handleFilterChange} />
      </Box>
      <Paper
        elevation={3}
        style={{
          padding: "10px 20px",
          boxShadow:
            "0px -4px 8px rgba(0, 0, 0, 0.1), 0px 0px 4px rgba(0, 0, 0, 0.05), 0px 4px 2px rgba(0, 0, 0, 0.025)",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>№</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {t("destination")}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {t("flightNumber")}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {t("passengerName")}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {t("departureDate")}
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={(event) =>
                  handleRowEvent(event, application.destination)
                }
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{application.destination}</TableCell>
                <TableCell align="right">{application.flightNumber}</TableCell>
                <TableCell align="right">{application.passengerName}</TableCell>
                <TableCell align="right">{application.departureDate}</TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => handleDelete(application.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => handleEdit(application)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => handleAdd()}
        style={{
          position: "fixed",
          left: "25px",
          bottom: "20px",
          zIndex: 1000,
        }}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        sx={{ "& .MuiDialog-paper": { width: "60%", maxWidth: "none" } }}
      >
        <EnterDialog
          isEditing={!!currentApplication}
          initialData={currentApplication}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      </Dialog>
    </TableContainer>
  );
}
