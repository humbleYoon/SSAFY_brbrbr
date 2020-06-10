import client from './client'

export interface PlaceInput {
  name: string
  description: string
  floor: number
  xaxis: number
  yaxis: number
  thumburl: string
  mapurl: string
}

const fetchPlaces = () => {
  return client.get('/places')
}

const addPlace = (place: PlaceInput) => {
  return client.post('/places', place)
}

const deletePlace = (placeId: number) => {
  return client.delete(`/places/${placeId}`)
}

export default { fetchPlaces, addPlace, deletePlace }
