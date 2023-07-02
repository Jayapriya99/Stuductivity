import React, { useEffect, useState } from 'react';
import { collection, doc, updateDoc, onSnapshot, deleteDoc} from 'firebase/firestore'
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';


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

    const getDateInWords = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'd MMMM yyyy');
      };
      

    useEffect(() => {
        const updateJournal = setTimeout(() => {
            const journalToUpdate = doc(journalCollection, params.id);

            updateDoc(journalToUpdate, {
                body: journalData
            })
                .then(() => {
                    console.log('Journal updated', {
                        autoClose:1000
                    })
                })
                .catch(() => {
                    console.log('Cannot update Journal', {
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
            
            <h3 className='title-header'> {title} </h3>
            <ReactQuill
                className='react-quill'
                value={journalData}
                onChange={getJournalData}
            />
            <Button 
            onClick={() => navigate('/Journal')} 
            className='backButton'
            style={{
                width:100, 
                height:50,
                bottom: 10,
                left: "9%",
                marginLeft: -100,
                position: "relative"
            }}
            sx={{
                backgroundColor: '#396EB0',
                color: '#FFFFFF'
              }}
            // variant="contained" 
            startIcon={<ArrowBackIcon />}
            >
                Back
            </Button>
            <Button 
            onClick={journalDelete}
            style={{
                width:120, 
                height:50,
                bottom: 10,
                left: "98%",
                marginLeft: -120,
                position: "relative"
            }}
            sx={{
                backgroundColor: '#FC997C',
                color: '#000000'
              }}
            // variant="contained" 
            endIcon={<DeleteIcon />}
            > Delete </Button>
        </div>
    )
}