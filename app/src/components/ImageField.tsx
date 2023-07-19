import React, {ChangeEvent} from 'react';
import {compress} from "../tools/image";
import {useUploadImage} from "../tools/service";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(() => ({
    blockImage: {
        width: '100%',
        paddingTop: '100%',
        position: 'relative',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 100
    },
}));

interface ImageFieldProps {
    name?: string
    label: string
    value?: string
    onChange: (image: string) => void
}
export function ImageField({ name, label, onChange, value }: ImageFieldProps) {
    const uploadImage = useUploadImage()
    const classes = useStyles();

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
        <div style={{  }}>
            <label htmlFor={name}>{label}</label>
            <div style={{
                display: 'block',
                width: '100%',
                padding: 10,
                fontSize: '13px',
                lineHeight: 1.5,
                color: '#212529',
                backgroundColor: '#F5F5F5',
                backgroundClip: 'padding-box',
                borderRadius: 10,
                position: 'relative'
            }}>
                {value && (
                    <div style={{ position: 'absolute', right: 8, top: 8, width: 40 }}>
                        <div className={classes.blockImage}>
                            <img alt="file" src={value} className={classes.image}/>
                        </div>
                    </div>
                )}
                <input
                    type="file"
                    id={name}
                    name="customFile"
                    accept="image/*"
                    onChange={onChangeFile}
                    style={{display:'none'}}
                />
                <label htmlFor={name} style={{ padding: '8px 12px', borderRadius: '6.998px', border: '0.778px solid #E1E1E1', background: '#FFFFFF', fontWeight: 400, opacity:0.7 }}>{value ? 'Картинка выбрана' : 'Выбрать файл'}</label>
            </div>
        </div>
    );
}

export default ImageField;
