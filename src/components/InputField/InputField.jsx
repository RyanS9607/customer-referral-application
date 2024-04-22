import React from 'react';
import { TextField } from '@mui/material';

function InputField({ value, onChange }) {
  return (
    <label>
      <TextField
        type="text"
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
}

export default InputField;
