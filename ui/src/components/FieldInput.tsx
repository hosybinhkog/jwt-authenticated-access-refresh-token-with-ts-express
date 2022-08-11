import React from "react";
import styled from "styled-components";

const LabelStyled = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const InputStyled = styled.input`
  border: 1px solid #865c6c;
  outline: none;
  border-radius: 4px;
  font-size: 1.3rem;
  font-weight: 400;
  background-color: #f3f3f4;
  padding: 0.5rem;
  min-width: 300px;
`;

interface FieldInputProps {
  name: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  value: string;
  type?: React.HTMLInputTypeAttribute | undefined;
}

const FieldInput: React.FC<FieldInputProps> = ({
  label,
  placeholder,
  onChange,
  name,
  type,
  value,
}) => {
  return (
    <>
      <LabelStyled htmlFor={name}>{label}</LabelStyled>
      <InputStyled
        id={name}
        type={type ? type : "text"}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default FieldInput;
