import React from 'react';
import { TextField } from '@mui/material';

function InputField({ value, onChange }) {
  return (
    <label>
      <TextField
        type="email"
        value={value}
        onChange={onChange}
        fullWidth= {true}
        size="small"
        inputProps={{min: 0, style: { textAlign: 'center' }}}
        required
      />
    </label>
  );
}

export default InputField;
