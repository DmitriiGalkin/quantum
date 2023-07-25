import React, {useEffect} from 'react';
import { load } from '@2gis/mapgl';
import {Meet} from "../tools/dto";

interface Props {
    state: { center: number[], zoom: number }
    meets: Meet[]
    setSelectedMeetId: (meetId: number) => void
}
export const Map2 = ({ state, meets, setSelectedMeetId }: Props) => {
    useEffect(() => {
        let map: any

        load().then((mapglAPI) => {
            map = new mapglAPI.Map('map-container', {
                center: [37.05511, 55.93246],
                zoom: 16,
                key: '3c3c9922-17f3-4b31-80ac-1f488cf1fcf6',
                zoomControl: false,
            });

            meets.forEach((meet) => {
                const marker = new mapglAPI.Marker(map, {
                    coordinates: [Number(meet.longitude), Number(meet.latitude)],
                    icon: 'http://localhost:3000/blank-place.png',
                    size: [121, 130],
                    anchor: [46, 78],
                    label: {
                        text: meet.title ? meet.title : 'meet.title',
                        color: '#ffffff',
                        offset: [50, -38],
                        relativeAnchor: [0, .5],
                        fontSize: 11,
                        image: {
                            url: 'titlesvg.svg',
                            size: [82, 18],
                            stretchX: [[6, 76]],
                            stretchY: [[6, 12]],
                            padding: [4, 9, 4, 9],
                        },
                    },
                });
                marker.on('click', function(e) {
                    setSelectedMeetId(meet.id);
                })
                new mapglAPI.HtmlMarker(map, {
                    coordinates: [37.05511, 55.93246],
                    html: '<img src="http://localhost:3000/image-place.png" style="width: 49px; height: 49px; object-fit: cover; border-radius: 6px"/>',
                    interactive: false,
                    anchor: [31, 70]
                })


            })
        });

        // Удаляем карту при размонтировании компонента
        return () => map && map.destroy();
    }, []);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <MapWrapper />
        </div>
    );
};

const MapWrapper = React.memo(
    () => {
        return <div id="map-container" style={{ width: '100%', height: '100%' }} />;
    },
    () => true,
);