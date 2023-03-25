import React, { useEffect, useState } from 'react';
import { collection, doc, updateDoc, onSnapshot, deleteDoc} from 'firebase/firestore'
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';

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
            toast.success('Notes deleted', {
            autoClose: 1000
            })
            navigate('/Notes')
        })
        .catch(() => {
            toast.error('Notes cannot be deleted', {
            autoClose: 1000
            })
        })
    }

    // const deleteNote = () => {
    //     deleteDoc(databaseCollection, params.id)
    //         .then(() => {
    //             toast.success('Notes deleted', {
    //                 autoClose:1000
    //             })
    //         })
    //         .catch(() => {
    //             toast.error('Cannot delete notes', {
    //                 autoClose:1000
    //             })
    //         })
    //     }

    

    return (
        <div>
            <ToastContainer/>
            <Button onClick={() => navigate('/Notes')} className='backButton'>
                Back
            </Button>
            <h3> {title} </h3>
            <ReactQuill
                value={notesData}
                onChange={getNotesData}
            />
            <Button onClick={noteDelete}> Delete </Button>
        </div>
    )
}