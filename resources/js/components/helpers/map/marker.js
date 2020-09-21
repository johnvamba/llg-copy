import React, { useEffect, useState } from 'react';
import { Marker as MapMarker, InfoWindow } from "react-google-maps"

const Marker = ({ lat, lng }) => {
    const [marks, setMarks] = useState([]);
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        async function fetchData() {
            let { data } = await axios.post(`/api/organizations/nearby/${lat}/${lng}`);

            setMarks(data);
        }

        fetchData();
    }, [lat, lng]);

    return marks.map(org => (
        <MapMarker
            key={org.id}
            position={{ lat: parseFloat(org.lat), lng: parseFloat(org.lng) }}
            onClick={() => { setShowInfo(true) }}
        >
            {showInfo &&
                (
                    <InfoWindow
                        onCloseClick={() => {
                            setShowInfo(false);
                        }}
                        position={{ lat: parseFloat(org.lat), lng: parseFloat(org.lng) }}
                    >
                        <div>
                            <p>{org.name}</p>
                        </div>
                    </InfoWindow>
                )
            }
        </MapMarker>
    ))
}

export default Marker;