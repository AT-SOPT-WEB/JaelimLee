/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MyPageInput from "../../components/MyPageInput";
export const mainStyle = css`
  background-color: rgb(228, 228, 228);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
`;
export const sectionStyle = css`
  width: 100%;
  height: 100%;
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
export const headerStyle = css`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
export const headerLeft = css`
  margin-right: auto;
  display: flex;
  gap: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

export const mainInputStyle = css`
  width: 70%;
  height: 30px;
  border-radius: 10px;
  border: none;
  padding: 10px 20px;
  &:focus {
    outline: none;
    border: 1px solid black;
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
export const myPageInputArea = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
