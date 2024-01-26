import React, {useState} from 'react';
import {IdeaFilter, useIdeas} from "../tools/service";
import {Stack} from "@mui/material";
import {DialogHeader} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {IdeaCard} from "../cards/IdeaCard";
import {Idea} from "../tools/dto";
import {useToggle} from "usehooks-ts";
import {AgeField} from "../components/AgeField";

export interface IdeasProps {
    onClose: () => void
}
function Ideas({ onClose }: IdeasProps) {
    const [filter, setFilter] = useState<IdeaFilter>()
    const { data, refetch } = useIdeas(filter);
    const [options, toggleOptions] = useToggle()

    return (
        <>
            <DialogHeader title="Идеи" onClick={onClose} onClickOption={toggleOptions}/>
            <DialogContent style={{ padding: 0 }}>
                {options && (
                    <Stack spacing={1} style={{ padding: 16, backgroundColor: 'white' }}>
                        <AgeField
                            ageFrom={filter?.ageFrom}
                            ageTo={filter?.ageTo}
                            onChange={({ ageFrom, ageTo }) => {
                                console.log(filter, ageFrom, ageTo, "Age filter")
                                setFilter({...filter, ageFrom, ageTo})
                            }}
                        />
                    </Stack>
                )}
                <Stack spacing={1} style={{ padding: 16 }}>
                    {data?.map((idea,index) =>
                        <IdeaCard key={idea.id} idea={idea} refetch={refetch} />
                    )}
                </Stack>
            </DialogContent>
        </>
    );
}
export default withDialog(Ideas)
