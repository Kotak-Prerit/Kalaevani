import React from 'react';
import { Rating as MuiRating } from '@mui/material';

const Rating = ({ value, onChange, size = 20, edit = true, isHalf = true }) => {
    const handleChange = (event, newValue) => {
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <MuiRating
            value={value}
            onChange={handleChange}
            precision={isHalf ? 0.5 : 1}
            readOnly={!edit}
            size={size <= 20 ? "small" : "medium"}
            sx={{
                color: "#ffd700",
                '& .MuiRating-iconEmpty': {
                    color: "#ccc"
                }
            }}
        />
    );
};

export default Rating; 