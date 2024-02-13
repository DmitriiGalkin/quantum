import React from 'react'
import { useToggle } from 'usehooks-ts'

import Places from '../dialogs/Places'
import { Place } from '../tools/dto'
import { usePlaces } from '../tools/service'
import { ImageSelect } from './ImageSelect'

interface PlaceSelectProps {
  onChange: (place: Place) => void
  value?: number
}

export function PlaceSelectDefault({ onChange, value }: PlaceSelectProps): JSX.Element {
  const [findPlace, toggleFindPlace] = useToggle()
  const { data: places = [] } = usePlaces()
  const selected = places.find((p) => p.id === value)

  return (
    <>
      <ImageSelect<Place>
        label="Место"
        selected={selected}
        items={places.slice(2)}
        onChange={onChange}
        onAdd={toggleFindPlace}
      />
      <Places
        open={findPlace}
        onSuccess={(place: Place) => {
          onChange(place)
          toggleFindPlace()
        }}
        onClose={toggleFindPlace}
      />
    </>
  )
}

export const PlaceSelect = PlaceSelectDefault
