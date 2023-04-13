import React from 'react';
import axios from "axios";
import {Button} from "@mui/material";

export default function Up() {
    const onSubmit = (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target.form);

        axios
            .post("http://localhost:4000/upload", formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(`Success` + res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Зона тестов</h1>
            <input
                id="contained-button-content"
                name="customFile"
                type="file"
            />
            <Button variant="contained" color="primary" onClick={onSubmit}>
                Сохранить и закрыть
            </Button>
        </form>
    );
};