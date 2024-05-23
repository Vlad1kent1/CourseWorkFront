import React from 'react'
import '@immfly/flights-map'

class FlightsMapContainer extends React.Component {
  render () {
    const flights = [
      {
        name: 'V131',
        origin: { city: 'Paris', latitude: 48.8567, longitude: 2.3510 },
        destination: { city: 'Toronto', latitude: 43.8163, longitude: -79.4287 },
        state: 0,
        color: '#F60'
      },
      {
        name: 'SZ1D',
        origin: { city: 'Szuć', latitude: 53.502781611608455, longitude: 20.730991641461287 },
        destination: { city: 'Storuman', latitude: 64.833677697428, longitude: 17.316869897704464 },
        state: 0,
        color: '#DA291C'
      }
    ]
    return <flights-map ref={(el) => { el && (el.flights = flights)} } />
  }
}

export default FlightsMapContainer