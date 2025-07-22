import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Container } from '@chakra-ui/react'

const CalendarPage = () => {
  return (
    <Container maxW="container.xl" p={4} bg={"black"}>
      <h1>Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
      />
    </Container>
  )
}

export default CalendarPage;