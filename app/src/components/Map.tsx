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
        // console.log(state,'state', 55.93246,37.05511)
        load().then((mapglAPI) => {
            map = new mapglAPI.Map('map-container', {
                center: [37.05511, 55.93246],
                zoom: 16,
                key: '3c3c9922-17f3-4b31-80ac-1f488cf1fcf6',
                zoomControl: false,
            });

            meets.forEach((meet) => {
                console.log(meet, 'meet')
                const marker = new mapglAPI.Marker(map, {
                    coordinates: [37.05511, 55.93246],
                    icon: 'http://localhost:3000/blank-place.png', //'https://selfproject.ru/place.png',
                    size: [62, 70],
                    anchor: [31, 70],
                    label: {
                        text: meet.title ? meet.title : 'meet.title',
                        color: '#ffffff',
                        offset: [50, -38],
                        relativeAnchor: [0, .5],
                        fontSize: 11,
                        image: {
                            url: 'titlesvg.svg',
                            size: [82, 18],
                            // Области изображения, которые будут растягиваться горизонтально (синие)
                            stretchX: [
                                [6, 76],
                            ],
                            // Области изображения, которые будут растягиваться вертикально (красные)
                            stretchY: [
                                [6, 12],
                            ],
                            padding: [4, 9, 4, 9],
                        },
                    },
                });

                // const marker2 = new mapglAPI.HtmlMarker(map, {
                //     coordinates: [37.05511, 55.93246],
                //     html: '<div style="border: 1px solid gray; border-radius: 6px;"><img src="https://selfproject.ru/place.png"/></div>',
                //     interactive: true,
                //     anchor: [31, 70]
                // })

                // marker.on('click', function(e) {
                //     setSelectedMeetId(meet.id);
                // })
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