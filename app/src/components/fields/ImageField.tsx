import React, {ChangeEvent} from 'react';
import {TimePicker} from "antd";
import dayjs, {Dayjs} from "dayjs";
import locale from "antd/es/date-picker/locale/ru_RU";
import {Button, Stack} from "@mui/material";
import {compress} from "../../tools/image";
import {useUploadImage} from "../../modules/image";

interface ImageFieldProps {
    label: string
    onChange: (image: string) => void
}
export function ImageField({ label, onChange }: ImageFieldProps) {
    const uploadImage = useUploadImage()

    const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0]
            compress(file, function(file) {
                const formData = new FormData();
                formData.append("image", file);
                return uploadImage.mutateAsync(formData).then((image) => {
                    onChange(image)
                }).catch((e) => console.log(e,'e'))
            })

        }
    };

    return (
        <Stack spacing={2} direction="column">
            <div style={{ fontWeight: 900, fontSize: 18, color: '#070707' }}>
                {label}
            </div>
            <div style={{
                display: 'block',
                width: '100%',
                padding: '14px 15px',
                fontSize: '16px',
                lineHeight: 1.5,
                color: '#212529',
                backgroundColor: '#F5F5F5',
                backgroundClip: 'padding-box',
                borderRadius: 10
            }}>
                <input
                    type="file"
                    id="file"
                    name="customFile"
                    accept="image/*"
                    onChange={onChangeFile}
                />
            </div>
        </Stack>
    );
}

export default ImageField;
