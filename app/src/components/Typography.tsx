import React, {CSSProperties} from 'react';
import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles(() => ({
    span: ({ variant, color }: { variant?: Variant, color?: 'primary' }) => {
        switch (variant) {
            case "Header1":
                return {
                    fontSize: 23, lineHeight: '28px', letterSpacing: '-0.01em', fontWeight: 900
                }
            case "Header2":
                return {
                    fontSize: 24,
                }
            case "Header3":
                return {
                    fontSize: 13,
                    opacity: .4,
                    color: '#070707',
                    fontWeight: 900,
                    lineHeight: '16px',
                    letterSpacing: '0.36px',
                }
            case "Body":
                return {
                    fontSize: 16,
                    opacity: .6,
                }
            case "Body2-Bold":
                return {
                    fontSize: 13,
                    fontWeight: 900,
                    color: color === 'primary' ? '#7139FF' : '#070707',
                    letterSpacing: -0.369231,
                }
            case "Caption":
                return {
                    fontSize: 9,
                    fontWeight: 500,
                    letterSpacing: '0.18px'
                }
            case "H5":
                return {
                    flexGrow:1, color: 'white', fontWeight: 'bold', fontSize: 20, letterSpacing: '-0.01em', lineHeight: '22px'
                }
            case 'MenuButton':
                return {
                    flexGrow: 1, fontSize: 15, fontWeight: 500, lineHeight: '30px', letterSpacing: '0.15px'
                }
            case 'TITLE':
                return { fontSize: 23, lineHeight: '28px', letterSpacing: '-0.01em', fontWeight: 900 }
            default:
                return {
                    fontSize: 16,
                }
        }
    },
}));

type Variant = 'Header1' | 'Header2' | 'Header3' | 'Body' | 'Body2-Bold' | 'Caption' | 'H5' | 'MenuButton' | 'TITLE'
interface TypographyProps{
    variant?: Variant
    color?: 'primary'
    children: React.ReactNode
    style?: CSSProperties
}
export function Typography({ variant, color, children, style }: TypographyProps) {
    const classes = useStyles({ variant, color });

    return (
        <span className={classes.span} style={style}>
            {children}
        </span>
    );
}

export default Typography;