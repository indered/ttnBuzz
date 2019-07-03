import styled from "styled-components";

export const Logo = styled.div`
  background: url("https://i.ibb.co/Bzn48bZ/TO-THE-NEW-Digital-Image.jpg");
  height: 120px;
  width: 120px;
  padding-top: 10px;

  margin: 0 30px;
  transform: scale(0.7);
  background-size: contain;
  -webkit-box-shadow: -1px 7px 17px -9px rgba(0, 0, 0, 1);
  -moz-box-shadow: -1px 7px 17px -9px rgba(0, 0, 0, 1);
  box-shadow: -1px 7px 17px -9px rgba(0, 0, 0, 1);
`;

export const Head = styled.header`
  width: 100%;
  height: 60px;
  position: relative;
  background: linear-gradient(
    -45deg,
    rgb(33, 42, 46) 40%,
    rgb(0, 0, 0) 70%,
    rgb(33, 42, 46) 100%
  );
`;

export const Button = styled.button`
  position: absolute;
  top: 40px;
  right: 30px;
  border: 2px solid rgb(30, 43, 78);
  color: rgb(30, 43, 78);
  padding: 12px 20px;
  margin-bottom: 10px;
  font-size: 15px;
  line-height: 12px;
  font-weight: 500;
  transition: background 0.2s;
  &:hover {
    color: white;
    background-color: rgb(40, 56, 63);
    border: none;
  }
`;

export const Cover = styled.div`
  background: url("https://i.ibb.co/d4f4bmy/banner2.jpg") no-repeat;
  height: 250px;
  width: 100%;
  background-size: cover;
  background-attachment: fixed;
`;
