import React from 'react';

interface ImageProps {
    src: string
    paddingTop?: string
    onLoad?: any
}
export default function Image({ src, paddingTop, onLoad }: ImageProps) {
    return (
        <div style={{
            width: '100%',
            paddingTop: paddingTop ? paddingTop : '100%',
            position: 'relative' }}
        >
            <img src={src} onLoad={onLoad}
                 style={{
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     width: '100%',
                     height: '100%',
                     objectFit: 'cover'
                 }}
            />
        </div>
    )
}
