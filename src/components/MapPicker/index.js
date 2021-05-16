import React from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet'

import { Icon } from './icon'

import './index.css'

const Markers = (props) => {
  useMapEvents({
    click(e) {
      props.trigger([e.latlng.lat, e.latlng.lng])
    },
  })

  return null
}

const MapPicker = ({ currentPos, setCurrentPos }) => {
  return (
    <>
      <MapContainer center={[50.447731, 30.542721]} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {currentPos ? (
          <>
            <Marker key={currentPos[0]} position={currentPos} interactive={false} icon={Icon} />
            <Popup
              position={[currentPos[0], currentPos[1]]}
              onClose={() => {
                setCurrentPos(null)
              }}
            >
              <div>
                <h2>Your location.</h2>
              </div>
            </Popup>
          </>
        ) : null}
        <Markers trigger={setCurrentPos} />
      </MapContainer>
    </>
  )
}

export default MapPicker
