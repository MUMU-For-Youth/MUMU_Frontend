import styled from "styled-components";
import { colors, spacing } from "./theme";

export const FlexContainer = styled.div<{
  direction?: "row" | "column";
  justify?: string;
  align?: string;
  gap?: string;
}>`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.align || "stretch"};
  gap: ${(props) => props.gap || spacing.md};
`;

export const Button = styled.button<{
  variant?: "primary" | "secondary" | "outline";
}>`
  padding: ${spacing.sm} ${spacing.md};
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;

  ${(props) => {
    switch (props.variant) {
      case "primary":
        return `
          background-color: ${colors.primary};
          color: ${colors.white};
          &:hover {
            background-color: ${colors.primary}dd;
          }
        `;
      case "secondary":
        return `
          background-color: ${colors.secondary};
          color: ${colors.white};
          &:hover {
            background-color: ${colors.secondary}dd;
          }
        `;
      case "outline":
        return `
          background-color: transparent;
          border: 1px solid ${colors.primary};
          color: ${colors.primary};
          &:hover {
            background-color: ${colors.primary}11;
          }
        `;
      default:
        return `
          background-color: ${colors.primary};
          color: ${colors.white};
          &:hover {
            background-color: ${colors.primary}dd;
          }
        `;
    }
  }}
`;

export const Card = styled.div`
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: ${spacing.md};
`;

export const Input = styled.input`
  padding: ${spacing.sm};
  border: 1px solid ${colors.gray[300]};
  border-radius: 4px;
  width: 100%;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;
