import React from 'react';
import moment from 'moment';
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import EventModal from "./EventModal";
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, ThemeProvider, createMuiTheme } from '@material-ui/core';
import '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#fff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
    padding: '20px',
  },
});

const theme = createMuiTheme();

export default function Calendar() {
  const classes = useStyles();

  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDateSelect = (selectInfo) => {
    setModalOpen(true);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        events={events}
        select={handleDateSelect}
        height={"100vh"}
        width={"200vh"}
        eventTimeFormat={{ hour: 'numeric', minute: '2-digit' }}
      />
    <EventModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        // onSave={handleSaveEvent}
      />
    </div>

   
  );
}
