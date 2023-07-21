import React, {useEffect} from 'react';
import { load } from '@2gis/mapgl';
import {Meet} from "../tools/dto";

interface Props {
    state: { center: number[], zoom: number }
    meets: Meet[]
}
export const Map2 = ({ state, meets }: Props) => {
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
                    label: {
                        text: meet.title,
                        offset: [20, 0],
                        relativeAnchor: [0, 1.5],
                        image: {
                            url: meet.image ? meet.image : 'tooltip-top.svg',
                            size: [100, 50],
                            stretchX: [
                                [10, 40],
                                [60, 90],
                            ],
                            stretchY: [[20, 40]],
                            padding: [20, 10, 10, 10],
                        },
                    },
                });
                //
                // marker.on('click', function(e) {
                //     console.log(e,'e');
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