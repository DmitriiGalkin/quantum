import React from 'react';
import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles(() => ({
    span: ({ variant }: { variant?: Variant }) => {
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
                    fontSize: 18,
                    opacity: .4,
                    color: '#070707',
                    fontWeight: 400,
                    lineHeight: '23.343px',
                    letterSpacing: '0.36px',
                }
            case "Body":
                return {
                    fontSize: 18,
                    opacity: .6,
                }
            default:
                return {
                    fontSize: 16,
                }
        }
    },
}));

type Variant = 'Header1' | 'Header2' | 'Header3' | 'Body'
interface TypographyProps{
    variant?: Variant
    children: React.ReactNode
}
export function Typography({ variant, children }: TypographyProps) {
    const classes = useStyles({ variant });

    return (
        <span className={classes.span}>
            {children}
        </span>
    );
}

export default Typography;