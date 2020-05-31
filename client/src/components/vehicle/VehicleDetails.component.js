import React, { useState, useEffect } from "react";
import { Button, Spinner, Alert } from "reactstrap";
import { useParams } from "react-router-dom";

import useApi from "../../hooks/useApi.hook";

import DeleteModal from "../general/DeleteModal.component";
import VehicleForm from "./VehicleForm.component";

const VehicleDetails = props => {
  const [edit, setEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState("");
  const { id } = useParams();

  const [{ data, isLoading, isError, errorMessage }, doFetch] = useApi();

  useEffect(() => {
    doFetch("get", "/api/vehicle/" + id);
  }, []);

  const setEditState = () => {
    edit ? setEdit(false) : setEdit(true);
  };

  const closeModal = () => {
    setDeleteModal("");
  };

  const openModal = () => {
    setDeleteModal(
      <DeleteModal
        id={id}
        safeWord={id.substr(id.length - 5)}
        page="vehicles"
        close={closeModal}
        path="vehicle"
      />
    );
  };

  return (
    <div>
      <div className="actionsSection">
        {/* Toggles edit mode */}
        {!edit ? (
          <Button outline color="primary" onClick={() => setEditState()}>
            Edit
          </Button>
        ) : (
          <Button color="danger" onClick={() => setEditState()}>
            Cancel
          </Button>
        )}
        <Button outline color="danger" onClick={openModal}>
          Delete
        </Button>
      </div>
      <div className="formSection">
        {deleteModal}
        {isError ? (
          <Alert color="danger">{errorMessage}</Alert>
        ) : isLoading ? (
          <Spinner color="primary" />
        ) : data != undefined ? (
          <VehicleForm vehicle={data} edit={edit} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default VehicleDetails;
