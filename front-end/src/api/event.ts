import client from './client'

export interface EventInput {
  name: string
  description: string
  starttime: Date
  endtime: Date
  placeName: string
  placeFloor: number
  thumbUrl: string
}

const fetchEvents = () => {
  return client.get('/events')
}

const addEvent = (event: EventInput) => {
  return client.post('/events', event)
}

const deleteEvent = (eventId: number) => {
  return client.delete(`/events/${eventId}`)
}

export default { fetchEvents, addEvent, deleteEvent }
