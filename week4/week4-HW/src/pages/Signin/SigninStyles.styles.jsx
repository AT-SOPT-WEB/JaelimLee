/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
export const mainStyle = css`
  background-color: rgb(228, 228, 228);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
`;

export const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;
export const formInputStyle = css`
  display: flex;
  flex-direction: row;
  gap: 20px;
  & input {
    width: 200px;
    height: 30px;
    border-radius: 10px;
    border: none;
    padding-left: 10px;
    &:focus {
      outline: none;
      border: 1px solid black;
    }
  }
`;
export const btnStyle = css`
  background-color: rgb(0, 0, 0);
  color: white;
  width: 100px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
`;
