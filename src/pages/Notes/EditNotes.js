import React, { useEffect, useState, useRef } from 'react';
import { collection, doc, updateDoc } from 'firebase/firestore'
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditNotes({
    database
}) {

    let params = useParams();
    let databaseCollection = collection(database, 'notes-data');
    const [notesData, setNotesData] = useState('');

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

    return (
        <div>
            <ToastContainer/>
            <ReactQuill
                value={notesData}
                onChange={getNotesData}
            />
        </div>
    )
}