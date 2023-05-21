import React from "react";
import { Modal, TextField, Box } from "@material-ui/core";

const styleCenter = {
    top: '50%',
    right: '50%',
    left: '50%',
    transform: 'translate(42%, 50%)',
    p: 1
  }

export default function EventModal({ open, onClose, onSave }) {
  const [title, setTitle] = React.useState("");

  const handleSave = () => {
    onSave(title);
    setTitle("");
  };

  return (
    <Box sx={styleCenter}>
    <Modal 
    style={{height:500, width: 500, backgroundColor:'white', position:'absolute', marginLeft: 480, marginTop:150}}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    open={open} 
    onClose={onClose}>
      <div>
        <Box>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        </Box>
      </div>
    </Modal>
    </Box>
  );
}
