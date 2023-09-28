import React from 'react';
import {useTiming} from "../tools/service";

export default function ControlView() {
    const { data } = useTiming()

    return (
        <>{JSON.stringify(data)}</>
    );
}
