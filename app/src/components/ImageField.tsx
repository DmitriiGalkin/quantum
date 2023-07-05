import React, {ChangeEvent} from 'react';
import {compress} from "../tools/image";
import {useUploadImage} from "../tools/service";

interface ImageFieldProps {
    label: string
    value?: string
    onChange: (image: string) => void
}
export function ImageField({ label, onChange, value }: ImageFieldProps) {
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
        <div>
            <div style={{ fontWeight: 900, color: '#070707', letterSpacing: '0.01em' }}>
                {label}
            </div>
            <div style={{ paddingTop: 8 }}>
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
                        style={{display:'none'}}
                    />
                    <label htmlFor="file">{value ? 'Картинка выбрана' : 'Выбрать файл'}</label>
                </div>
            </div>
        </div>
    );
}

export default ImageField;
