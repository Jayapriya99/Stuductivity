import React, { useEffect, useState } from 'react';
import { collection, doc, updateDoc, onSnapshot, deleteDoc} from 'firebase/firestore'
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';

export default function EditJournal({
    database
}) {

    let params = useParams();
    let journalCollection = collection(database, 'journal-data');
    let navigate = useNavigate();
    const [journalData, setJournalData] = useState('');
    const [title, setTitle] = useState('');

    const getJournalData = (value) => {
        setJournalData(value);
    };

    useEffect(() => {
        const updateJournal = setTimeout(() => {
            const journalToUpdate = doc(journalCollection, params.id);

            updateDoc(journalToUpdate, {
                body: journalData
            })
                .then(() => {
                    toast.success('Journal updated', {
                        autoClose:1000
                    })
                })
                .catch(() => {
                    toast.error('Cannot update Journal', {
                        autoClose:1000
                    })
                })
        }, 2000);
        return () => clearTimeout(updateJournal);
    }, [journalData]);

    useEffect(() => {
        const journalDocument = doc(journalCollection, params.id)
        onSnapshot(journalDocument, (docs) => {
            setTitle(docs.data().title);
            setJournalData(docs.data().body);
        })

    }, [])

    const journalDelete = () => {
        let deleteJournal = doc(journalCollection, params.id)
        deleteDoc(deleteJournal)
        .then((response) => {
            alert('Journal deleted', {
            autoClose: 1000
            })
            navigate('/Journal')
        })
        .catch(() => {
            alert('Journal cannot be deleted', {
            autoClose: 1000
            })
        })
    }
    

    return (
        <div>
            <ToastContainer/>
            <Button onClick={() => navigate('/Journal')} className='backButton'>
                Back
            </Button>
            <h3> {title} </h3>
            <ReactQuill
                value={journalData}
                onChange={getJournalData}
            />
            <Button onClick={journalDelete}> Delete </Button>
        </div>
    )
}