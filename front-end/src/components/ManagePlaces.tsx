import React, { useState, useEffect, useReducer, useCallback } from 'react'
import { Place } from '../pages/RobotPage'
import placeApi, { PlaceInput } from '../api/place'

const initialState: PlaceInput = {
  name: '',
  description: '',
  floor: 1,
  xaxis: 1.1,
  yaxis: 1.1,
  thumbUrl: '',
  mapurl: '',
}

function reducer(
  state: PlaceInput,
  action:
    | (EventTarget & HTMLInputElement)
    | { type: 'reset'; name: ''; value: '' }
) {
  if (action.type === 'reset') {
    return initialState
  } else {
    return {
      ...state,
      [action.name]: action.value,
    }
  }
}
function ManagePlaces() {
  const [places, setPlaces] = useState<Place[]>([])
  const [state, dispatch] = useReducer(reducer, initialState)

  const { name, description, floor, xaxis, yaxis, thumbUrl, mapurl } = state
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target)
  }

  const header = [
    'ID',
    '이름',
    '설명',
    '층',
    'x좌표',
    'y좌표',
    '썸네일 URL',
    '약도 URL',
  ]

  const getPlaces = useCallback(async () => {
    try {
      const res = await placeApi.fetchPlaces()
      setPlaces(res.data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const postPlace = useCallback(async (state: PlaceInput) => {
    try {
      const res = await placeApi.addPlace(state)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }, [])

  const deletePlace = useCallback(async (placeId: number) => {
    try {
      await placeApi.deletePlace(placeId)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    getPlaces()
  }, [getPlaces])

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const newPlace = await postPlace(state)
    setPlaces((places) => [...places, newPlace])
    dispatch({ type: 'reset', name: '', value: '' })
  }

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = e.target as HTMLButtonElement
    const placeId = Number(target.value)

    await deletePlace(placeId)
    setPlaces((places) =>
      places.filter((place) => {
        return place.id !== placeId
      })
    )
  }

  return (
    <div>
      <h2>장소 정보</h2>

      <table>
        <thead>
          <tr>
            {header.map((elem: string, index: number) => (
              <td key={index}>{elem}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {places.map((place: Place) => (
            <tr key={place.id}>
              {Object.values(place).map((value: string, index: number) => (
                <td key={index}>{value}</td>
              ))}
              <td>
                <button onClick={handleDelete} value={place.id}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td>
              <input name="name" value={name} onChange={onChange} />
            </td>
            <td>
              <input
                name="description"
                value={description}
                onChange={onChange}
              />
            </td>

            <td>
              <input name="floor" value={floor} onChange={onChange} />
            </td>
            <td>
              <input name="xaxis" value={xaxis} onChange={onChange} />
            </td>
            <td>
              <input name="yaxis" value={yaxis} onChange={onChange} />
            </td>
            <td>
              <input name="thumbUrl" value={thumbUrl} onChange={onChange} />
            </td>
            <td>
              <input name="mapurl" value={mapurl} onChange={onChange} />
            </td>
            <td>
              <button onClick={handleClick}>등록</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ManagePlaces
