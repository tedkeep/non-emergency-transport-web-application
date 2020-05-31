import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from "reactstrap";
import { useHistory } from "react-router-dom";
import useApi from "../../hooks/useApi.hook";

const DeleteModal = props => {
  const { id, safeWord, page, close, path } = props;
  const history = useHistory();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [modal, setModal] = useState(true);
  const [{ data }, doFetch] = useApi();

  const checkSafeWord = e => {
    const val = e.target.value;
    if (val === safeWord) {
      setDeleteConfirm(true);
    } else {
      setDeleteConfirm(false);
    }
  };

  useEffect(() => {
    if (data != undefined) history.push(`/${page}`);
  }, [data]);

  const onDelete = () => {
    doFetch("delete", `/api/${path}/${id}`);
  };

  const toggle = () => {
    close();
  };

  return (
    <Modal isOpen={modal} toggle={toggle} backdrop="static">
      <ModalHeader toggle={toggle}>Delete</ModalHeader>
      <ModalBody>
        <p>
          Are you sure you want to delete? This cannot be undone! To Confirm you
          want to delete, type in <b>{safeWord}</b> below
        </p>

        <Input onChange={e => checkSafeWord(e)}></Input>
      </ModalBody>
      <ModalFooter>
        <Button
          disabled={!deleteConfirm}
          outline
          color="danger"
          onClick={onDelete}
        >
          Delete
        </Button>
        <Button onClick={toggle} color="primary">
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteModal;
