/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState, useEffect, useReducer, useCallback } from 'react'
import { Event } from '../pages/RobotPage'
import eventApi, { EventInput } from '../api/event'

const initialState: EventInput = {
  name: '',
  description: '',
  starttime: new Date(),
  endtime: new Date(),
  placeName: '',
  placeFloor: 1,
  thumburl: '',
}

function reducer(
  state: EventInput,
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

function trimSeconds(datetimeISOSformat: Date) {
  return datetimeISOSformat.toISOString().split('.')[0]
}

function ManageEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    name,
    description,
    starttime,
    endtime,
    placeName,
    placeFloor,
    thumburl,
  } = state
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target)
  }
  const header = [
    'ID',
    '이름',
    '설명',
    '시작 시각',
    '종료 시각',
    '장소',
    '층',
    '썸네일 URl',
  ]

  const getEvents = useCallback(async () => {
    try {
      const res = await eventApi.fetchEvents()
      setEvents(res.data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const postEvent = useCallback(async (state: EventInput) => {
    try {
      const res = await eventApi.addEvent(state)
      return res.data
    } catch (error) {
      alert('행사 정보를 다시 확인해주세요')
      console.error(error)
    }
  }, [])

  const deletePlace = useCallback(async (placeId: number) => {
    try {
      await eventApi.deleteEvent(placeId)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    getEvents()
  }, [getEvents])

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const newEvent = await postEvent(state)
    if (newEvent) {
      setEvents((events) => [...events, newEvent])
    }
    dispatch({ type: 'reset', name: '', value: '' })
  }

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = e.target as HTMLButtonElement
    const eventId = Number(target.value)

    await deletePlace(eventId)
    setEvents((events) =>
      events.filter((event) => {
        return event.id !== eventId
      })
    )
  }

  return (
    <div>
      <h2>행사 정보</h2>

      <div
        css={css`
          height: 300px;
          overflow-y: auto;
        `}
      >
        <table>
          <thead>
            <tr>
              {header.map((elem: string, index: number) => (
                <td key={index}>{elem}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.map((event: Event) => (
              <tr key={event.id}>
                {Object.values(event).map((value: string, index: number) => (
                  <td key={index}>
                    {[3, 4].includes(index)
                      ? new Date(value).toLocaleString('ko-KR')
                      : value}
                  </td>
                ))}
                <td>
                  <button onClick={handleDelete} value={event.id}>
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
                <input
                  type="datetime-local"
                  name="starttime"
                  value={trimSeconds(starttime)}
                  onChange={onChange}
                />
              </td>
              <td>
                <input
                  type="datetime-local"
                  name="endtime"
                  value={trimSeconds(endtime)}
                  onChange={onChange}
                />
              </td>
              <td>
                <input name="placeName" value={placeName} onChange={onChange} />
              </td>
              <td>
                <input
                  name="placeFloor"
                  value={placeFloor}
                  onChange={onChange}
                />
              </td>
              <td>
                <input name="thumburl" value={thumburl} onChange={onChange} />
              </td>
              <td>
                <button onClick={handleClick}>등록</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageEvents
