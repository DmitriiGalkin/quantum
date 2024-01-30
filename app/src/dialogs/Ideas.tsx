import React, {useState} from 'react';
import {IdeaFilter, useIdeas} from "../tools/service";
import {Stack} from "@mui/material";
import {DialogHeader} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {IdeaCard} from "../cards/IdeaCard";
import {useToggle} from "usehooks-ts";
import {AgeField} from "../components/AgeField";
import {Block} from "../components/Block";

export interface IdeasProps {
    userId?: string
    onClose: () => void
}
function Ideas({ onClose, userId }: IdeasProps) {
    const [filter, setFilter] = useState<IdeaFilter>({ userId })
    const { data, refetch } = useIdeas(filter);
    const [options, toggleOptions] = useToggle()

    return (
        <>
            <DialogHeader title="Идеи" onClick={onClose} onClickOption={toggleOptions}/>
            <DialogContent>
                {options && (
                    <Block variant="primary">
                        <AgeField
                            ageFrom={filter?.ageFrom}
                            ageTo={filter?.ageTo}
                            onChange={({ ageFrom, ageTo }) => {
                                setFilter({...filter, ageFrom, ageTo})
                            }}
                        />
                    </Block>
                )}
                <Block variant="secondary">
                    <Stack spacing={1}>
                        {data?.map((idea,index) =>
                            <IdeaCard key={idea.id} idea={idea} refetch={refetch} />
                        )}
                    </Stack>
                </Block>
            </DialogContent>
        </>
    );
}
export default withDialog(Ideas)
