import {NewMeet} from "../../modules/meet";
import dayjs from "dayjs";
import {Project} from "../../modules/project";

export function valuetext(value: number) {
    return `${value}°C2222`;
}
function toHoursAndMinutes(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
}
export function valuetext2(value: number) {
    const {hours, minutes} = toHoursAndMinutes(value)
    return `${hours}:${minutes === 0 ? '00' : minutes}`;
}
export const DEFAULT_MEET: NewMeet = {
    title: 'новая встреча',
    description: 'описание встречи',
    image: null,
    projectId: null,
}

export const getProjectDefaultDatetime = (project: Project): [string, string] => {
    const datetime = dayjs(dayjs().format('YYYY-MM-DD')).hour(10).format('YYYY-MM-DDTHH:mm:ss')
    const endDatetime = dayjs(dayjs().format('YYYY-MM-DD')).hour(11).format('YYYY-MM-DDTHH:mm:ss')

    return [datetime, endDatetime]
}