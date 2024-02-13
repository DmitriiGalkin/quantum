import React from 'react'
import { useToggle } from 'usehooks-ts'

import EditPlace from '../dialogs/EditPlace'
import { Place } from '../tools/dto'
import { usePlaces } from '../tools/service'
import { COLOR_PAPER } from '../tools/theme'

interface PlaceSelectProps {
  onChange: (place: Place) => void
  place?: Partial<Place>
}

export function PlaceSelectDefault({ onChange, place }: PlaceSelectProps): JSX.Element {
  const { data: places = [] as Place[], refetch } = usePlaces()
  const [openCreatePlace, toggleOpenCreatePlace] = useToggle()

  return (
    <div>
      <label htmlFor="place">Место</label>
      <div
        style={{
          display: 'block',
          width: '100%',
          padding: 10,
          fontSize: '13px',
          lineHeight: 1.5,
          color: '#212529',
          backgroundColor: COLOR_PAPER,
          backgroundClip: 'padding-box',
          borderRadius: 10,
          position: 'relative',
        }}
      >
        {place && <div style={{ position: 'absolute', left: 150, top: 20 }}>{place.title}</div>}
        <label
          onClick={toggleOpenCreatePlace}
          htmlFor="place"
          style={{
            padding: '8px 12px',
            borderRadius: '6.998px',
            border: '0.778px solid #E1E1E1',
            background: '#FFFFFF',
            fontWeight: 400,
            opacity: 0.7,
          }}
        >
          {place?.title ? 'Место выбрано' : 'На карте'}
        </label>
      </div>
      <EditPlace
        places={places}
        onSuccess={(place: Place) => {
          refetch()
          onChange(place)
        }}
        open={openCreatePlace}
        onClose={toggleOpenCreatePlace}
      />
    </div>
  )
}

export const PlaceSelect2 = PlaceSelectDefault
