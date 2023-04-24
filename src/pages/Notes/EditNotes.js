import React, { useEffect, useState } from 'react';
import { collection, doc, updateDoc, onSnapshot, deleteDoc} from 'firebase/firestore'
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EditNotes({
    database
}) {

    let params = useParams();
    let databaseCollection = collection(database, 'notes-data');
    let navigate = useNavigate();
    const [notesData, setNotesData] = useState('');
    const [title, setTitle] = useState('');

    const getNotesData = (value) => {
        setNotesData(value);
    };


    useEffect(() => {
        const updateNotes = setTimeout(() => {
            const notesToUpdate = doc(databaseCollection, params.id);

            updateDoc(notesToUpdate, {
                body: notesData
            })
                .then(() => {
                    toast.success('Notes updated', {
                        autoClose:1000
                    })
                })
                .catch(() => {
                    toast.error('Cannot update notes', {
                        autoClose:1000
                    })
                })
        }, 2000);
        return () => clearTimeout(updateNotes);
    }, [notesData]);

    useEffect(() => {
        const noteDocument = doc(databaseCollection, params.id)
        onSnapshot(noteDocument, (docs) => {
            setTitle(docs.data().title);
            setNotesData(docs.data().body);
        })

    }, [])

    const noteDelete = () => {
        let deleteNotes = doc(databaseCollection, params.id)
        deleteDoc(deleteNotes)
        .then((response) => {
            alert('Notes deleted', {
            autoClose: 1000
            })
            navigate('/Notes')
        })
        .catch(() => {
            alert('Notes cannot be deleted', {
            autoClose: 1000
            })
        })
    }
    

    return (
        <div>
            <ToastContainer/>
            {/* <Button onClick={() => navigate('/Notes')} className='backButton'>
                Back
            </Button> */}
            {/* <Box sx={buttonStyle}
            > */}
            
            {/* </Box> */}
            <h3 className='title-header'> {title} </h3>
            <ReactQuill
                className='react-quill'
                value={notesData}
                onChange={getNotesData}
            />
            {/* <Button onClick={noteDelete}> Delete </Button> */}
            <Button 
                className='deleteButton'
                style={{
                    width:100, 
                    height:50,
                    bottom: 10,
                    left: "98%",
                    marginLeft: -100,
                    position: "relative"
                }}
                variant="contained" 
                endIcon={<DeleteIcon />}
                onClick={noteDelete}
                size='large'>
                Delete
            </Button>

            <Button 
                className='backButton'
                style={{
                    width:100, 
                    height:50,
                    bottom: 10,
                    left: "9%",
                    marginLeft: -100,
                    position: "relative"
                }}
                variant="contained" 
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/Notes')}
                size='large'>
                Back
            </Button>
        </div>
    )
}