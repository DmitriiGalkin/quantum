import React, {ChangeEvent} from 'react';
import {compress} from "../tools/image";
import {useUploadImage} from "../tools/service";
import {makeStyles} from "@mui/styles";
import {Stack} from "@mui/material";
import {TemporalAdjusters} from "@js-joda/core";
import dayOfWeekInMonth = TemporalAdjusters.dayOfWeekInMonth;
import {getDayOfWeekTitle} from "../tools/date";
import {Timing} from "../tools/dto";

interface SwitchProps {
    checked?: boolean
    onChange: (value: boolean) => void
}
function Switch({ checked, onChange }: SwitchProps) {
    if (checked) {
        return (
            <div onClick={() => onChange(false)}>
                <svg width="57" height="43" viewBox="0 0 57 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.857 3.09215C17.597 2.99215 19.335 3.00015 21.075 3.00015C21.087 3.00015 29.892 3.00015 29.892 3.00015C31.666 3.00015 33.404 2.99215 35.143 3.09215C36.724 3.18215 38.264 3.37415 39.797 3.80315C43.024 4.70515 45.842 6.58915 47.879 9.26015C49.904 11.9142 51 15.1632 51 18.4992C51 21.8392 49.904 25.0862 47.879 27.7402C45.842 30.4102 43.024 32.2952 39.797 33.1972C38.264 33.6262 36.724 33.8172 35.143 33.9082C33.404 34.0082 31.666 33.9992 29.926 33.9992C29.914 33.9992 21.107 34.0002 21.107 34.0002C19.335 33.9992 17.597 34.0082 15.857 33.9082C14.277 33.8172 12.737 33.6262 11.204 33.1972C7.977 32.2952 5.159 30.4102 3.122 27.7402C1.097 25.0862 0 21.8392 0 18.5002C0 15.1632 1.097 11.9142 3.122 9.26015C5.159 6.58915 7.977 4.70515 11.204 3.80315C12.737 3.37415 14.277 3.18215 15.857 3.09215Z" fill="#7139FF"/>
                    <g filter="url(#filter0_dd_659_1272)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M35.5 32C42.9558 32 49 25.9558 49 18.5C49 11.0442 42.9558 5 35.5 5C28.0442 5 22 11.0442 22 18.5C22 25.9558 28.0442 32 35.5 32Z" fill="white"/>
                    </g>
                    <defs>
                        <filter id="filter0_dd_659_1272" x="14" y="0" width="43" height="43" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="3"/>
                            <feGaussianBlur stdDeviation="0.5"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_659_1272"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="3"/>
                            <feGaussianBlur stdDeviation="4"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                            <feBlend mode="normal" in2="effect1_dropShadow_659_1272" result="effect2_dropShadow_659_1272"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_659_1272" result="shape"/>
                        </filter>
                    </defs>
                </svg>

            </div>
        )
    }

    return (
        <div onClick={() => onChange(true)}>
            <svg width="58" height="45" viewBox="0 0 58 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M22.857 4.09215C24.597 3.99215 26.335 4.00015 28.075 4.00015C28.087 4.00015 36.892 4.00015 36.892 4.00015C38.666 4.00015 40.404 3.99215 42.143 4.09215C43.724 4.18215 45.264 4.37415 46.797 4.80315C50.024 5.70515 52.842 7.58915 54.879 10.2602C56.904 12.9142 58 16.1632 58 19.4992C58 22.8392 56.904 26.0862 54.879 28.7402C52.842 31.4102 50.024 33.2952 46.797 34.1972C45.264 34.6262 43.724 34.8172 42.143 34.9082C40.404 35.0082 38.666 34.9992 36.926 34.9992C36.914 34.9992 28.107 35.0002 28.107 35.0002C26.335 34.9992 24.597 35.0082 22.857 34.9082C21.277 34.8172 19.737 34.6262 18.204 34.1972C14.977 33.2952 12.159 31.4102 10.122 28.7402C8.097 26.0862 7 22.8392 7 19.5002C7 16.1632 8.097 12.9142 10.122 10.2602C12.159 7.58915 14.977 5.70515 18.204 4.80315C19.737 4.37415 21.277 4.18215 22.857 4.09215Z" fill="#797584"/>
                <g filter="url(#filter0_dd_578_2435)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M22.5 33C29.9558 33 36 26.9558 36 19.5C36 12.0442 29.9558 6 22.5 6C15.0442 6 9 12.0442 9 19.5C9 26.9558 15.0442 33 22.5 33Z" fill="white"/>
                    <path d="M22.5 33.25C30.0939 33.25 36.25 27.0939 36.25 19.5C36.25 11.9061 30.0939 5.75 22.5 5.75C14.9061 5.75 8.75 11.9061 8.75 19.5C8.75 27.0939 14.9061 33.25 22.5 33.25Z" stroke="black" stroke-opacity="0.04" stroke-width="0.5"/>
                </g>
                <defs>
                    <filter id="filter0_dd_578_2435" x="0.5" y="0.5" width="44" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="3"/>
                        <feGaussianBlur stdDeviation="0.5"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_578_2435"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="3"/>
                        <feGaussianBlur stdDeviation="4"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                        <feBlend mode="normal" in2="effect1_dropShadow_578_2435" result="effect2_dropShadow_578_2435"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_578_2435" result="shape"/>
                    </filter>
                </defs>
            </svg>

        </div>
    );
}

export default Switch;
