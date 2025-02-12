import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const ConfirmationModal = ({ open, title, content, onConfirm, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ minWidth: 300 }}>
      <DialogTitle>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ textAlign: "center", mt: 1, px: 2 }}>
          {content}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={onClose}
          color="primary"
          variant="outlined"
          sx={{ px: 3, py: 1 }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="primary"
          variant="contained"
          sx={{ px: 3, py: 1 }}
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
