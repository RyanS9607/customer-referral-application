import React from 'react';

function InputField({ value, onChange }) {
  return (
    <label>
      <input
        type="email"
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
}

export default InputField;
