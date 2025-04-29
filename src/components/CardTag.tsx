import React from "react";
import styled from "styled-components";

interface CardTagProps {
  children: React.ReactNode;
}

const CardTag: React.FC<CardTagProps> = ({ children }) => {
  return <TagContainer>{children}</TagContainer>;
};

export default CardTag;

const TagContainer = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #6287fa;
  background: #fff;
  color: #6287fa;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 999px;
  padding: 0 10px;
  letter-spacing: 0.01em;
  box-sizing: border-box;
  min-height: 22px;
  line-height: 1.2;
  width: fit-content;
  min-width: 30px;
`;
