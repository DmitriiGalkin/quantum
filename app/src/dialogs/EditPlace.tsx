import { Stack } from '@mui/material'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import React, { useRef, useState } from 'react'

import { Button, DialogHeader, Input } from '../components'
import { DialogContent } from '../components/DialogContent'
import { withDialog } from '../components/helper'
import { Place } from '../tools/dto'
import { useGeolocation } from '../tools/geolocation'
import { BOX_SHADOW, COLOR } from '../tools/theme'

interface EditPlaceProps {
  places: Place[]
  onClose: () => void
  onSuccess: (place: Place) => void
}
function EditPlace({ places, onSuccess, onClose }: EditPlaceProps) {
  const { defaultState } = useGeolocation()
  const map = useRef()

  const [place, setPlace] = useState<Place>({ id: 0, title: '', latitude: '1', longitude: '2', image: '' })

  if (!defaultState) return null

  return (
    <>
      <DialogHeader title="Добавление Места" onClick={onClose} isClose />
      <div style={{ position: 'absolute', top: 54, bottom: 0, left: 0, right: 0 }}>
        <div style={{ position: 'absolute', top: 'calc(33.33% - 46px)', left: 'calc(50% - 13px)', zIndex: 5000 }}>
          <svg width="26" height="46" viewBox="0 0 26 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="13" cy="13" r="12" fill="#FFA028" stroke="#394F63" strokeWidth="2" />
            <path d="M13 25L13 45" stroke="#394F63" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <DialogContent>
        <YMaps>
          <Map
            instanceRef={map}
            onBoundsChange={(xx: { originalEvent: { newBounds: number[][] } }) => {
              const [[x1, y1], [x2, y2]] = xx.originalEvent.newBounds
              const latitude = String(x1 + (x2 - x1) / 2)
              const longitude = String(y1 + (y2 - y1) / 2)
              setPlace({ ...place, latitude, longitude })
            }}
            defaultState={defaultState}
            width="100%"
            height="100%"
          >
            {places.map((place) => (
              <Placemark
                key={place.id}
                modules={['geoObject.addon.balloon']}
                defaultGeometry={[place.latitude, place.longitude]}
                options={{
                  preset: 'islands#icon',
                  iconColor: COLOR,
                }}
                onClick={() => {
                  onSuccess(place)
                  onClose()
                }}
              />
            ))}
          </Map>
        </YMaps>
      </DialogContent>

      <div style={{ padding: 15, backgroundColor: 'white', boxShadow: BOX_SHADOW, zIndex: 1 }}>
        <Stack spacing={3}>
          <Input
            name="title"
            label="Название"
            value={place?.title}
            onChange={(e) => setPlace({ ...place, title: e.target.value } as Place)}
            placeholder="Название места"
          />
          <Button
            onClick={() => {
              onSuccess(place)
              onClose()
            }}
          >
            Добавить
          </Button>
        </Stack>
      </div>
    </>
  )
}

export default withDialog(EditPlace)
