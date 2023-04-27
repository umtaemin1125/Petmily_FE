import "./join.css";

import React, { useRef, useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Button = styled.button`
  width: 300px;
  height: 35px;
  background-color: #fbd385;
  border: none;
  border-radius: 4px;
  margin-top: 40px;
`;

const Joinup = styled.h1`
  color: #fbd385;
  font-size: 40px;
`;

const Section = styled.section`
  text-align: center;
  background-color: white;
  border: none;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-end;
`;

const InputName = styled.div`
  width: 4.5rem;
  background-color: #fbd385;
  text-align: center;

  padding: 10px 22px;
  border-radius: 6px;
  border: 2px solid #ffbd59;
  flex-shrink: 0;
`;

const Inputbox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  padding: 0px 25px;
`;

const Join = () => {
  const IDRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const nicknameRef = useRef();
  const dateOfBirthRef = useRef();
  const phonenumberRef = useRef();
  const addressRef = useRef();
  const genderRef = useRef();
  const formRef = useRef(null);
  const [birth, setBirth] = useState("");

  const handleFormSubmit1 = (e) => {
    e.preventDefault();
    const formData = e.currentTarget;

    const bodyData = {
      userId: formData["user-id"].value,
      userPw: formData["user-pw"].value,
      chkUserPw: formData["chk-user-pw"].value,
      userEmail: formData["user-email"].value,
      userName: formData["user-name"].value,
      userNickname: formData["user-nickname"].value,
      date: birth["$d"],
      userNumber: formData["user-number"].value,
      userAddress: formData["user-address"].value,
      userGender: formData["gender"].value,
    };

    console.log(bodyData);
  };
  console.log(
    IDRef?.current?.querySelector("input").value,
    passwordRef?.current?.querySelector("input").value,
    confirmPasswordRef?.current?.querySelector("input").value,
    emailRef?.current?.querySelector("input").value,
    nameRef?.current?.querySelector("input").value,
    nicknameRef?.current?.querySelector("input").value,
    dateOfBirthRef?.current?.querySelector("input").value,
    phonenumberRef?.current?.querySelector("input").value,
    addressRef?.current?.querySelector("input").value
  );
  const handleFormSubmit = (e) => {
    if (
      !IDRef?.current?.querySelector("input").value ||
      !passwordRef?.current?.querySelector("input").value ||
      !confirmPasswordRef?.current?.querySelector("input").value ||
      !emailRef?.current?.querySelector("input").value ||
      !nameRef?.current?.querySelector("input").value ||
      !nicknameRef?.current?.querySelector("input").value ||
      !dateOfBirthRef?.current?.querySelector("input").value ||
      !phonenumberRef?.current?.querySelector("input").value ||
      !addressRef?.current?.querySelector("input").value
    ) {
      alert("입력하지 않은 항목이 존재합니다.");
      return;
    }

    const IDRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{6,15}$/;
    if (!IDRegex.test(IDRef.current.querySelector("input").value)) {
      alert(
        "아이디는 6자 이상, 15자 이하의 영어 소문자와 숫자가 포함되어야 합니다."
      );
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,20}$/;
    if (!passwordRegex.test(passwordRef.current.querySelector("input").value)) {
      alert(
        "비밀번호는 8자 이상, 20자 이하의 영어 소문자와 숫자가 포함되어야 합니다."
      );
      return;
    }

    if (
      passwordRef.current.querySelector("input").value !==
      confirmPasswordRef.current.querySelector("input").value
    ) {
      alert("두 비밀번호가 일치하지 않습니다.");
      return;
    }

    alert("회원가입이 완료되었습니다.\n로그인 화면으로 이동합니다.");
    window.location.href = "http://localhost:3000/login";
  };

  return (
    <>
      <Section>
        {/*<form onSubmit={handleFormSubmit} ref={formRef}>*/}
        <div>
          <Joinup>
            <br />
            회원가입
          </Joinup>

          <div className="form-wrapper">
            <InputContainer>
              <InputName>ID</InputName>
              <TextField
                type="id"
                variant="standard"
                className="input-item"
                name="user-id"
                ref={IDRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const target = passwordRef.current.querySelector("input");
                    target.focus();
                  }
                }}
              />
            </InputContainer>

            <InputContainer>
              <InputName>PW</InputName>
              <TextField
                type="password"
                variant="standard"
                className="input-item"
                name="user-pw"
                ref={passwordRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const target =
                      confirmPasswordRef.current.querySelector("input");
                    target.focus();
                  }
                }}
              />
            </InputContainer>

            <InputContainer>
              <InputName>PW 확인</InputName>
              <TextField
                type="password"
                variant="standard"
                className="input-item"
                name="chk-user-pw"
                ref={confirmPasswordRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const target = emailRef.current.querySelector("input");
                    target.focus();
                  }
                }}
              />
            </InputContainer>

            <InputContainer>
              <InputName>이메일</InputName>
              <TextField
                type="email"
                variant="standard"
                className="input-item"
                name="user-email"
                ref={emailRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const target = nameRef.current.querySelector("input");
                    target.focus();
                  }
                }}
              />
            </InputContainer>

            <InputContainer>
              <InputName>이름</InputName>
              <TextField
                type="name"
                variant="standard"
                maxLength="10"
                className="input-item"
                name="user-name"
                ref={nameRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const target = nicknameRef.current.querySelector("input");
                    target.focus();
                  }
                }}
              />
            </InputContainer>

            <InputContainer>
              <InputName>닉네임</InputName>
              <TextField
                type="nickname"
                variant="standard"
                className="input-item"
                name="user-nickname"
                ref={nicknameRef}
              />
            </InputContainer>

            <InputContainer>
              <InputName>생년월일</InputName>
              <Inputbox>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <input type="date" /> */}
                  <DatePicker
                    className="input-item default-date"
                    ref={dateOfBirthRef}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const target =
                          phonenumberRef.current.querySelector("input");
                        target.focus();
                      }
                    }}
                    onChange={(nv) => setBirth(nv)}
                  />
                </LocalizationProvider>
              </Inputbox>
            </InputContainer>

            <InputContainer>
              <InputName>전화번호</InputName>
              <TextField
                type="phonenumber"
                variant="standard"
                className="input-item"
                ref={phonenumberRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const target = addressRef.current.querySelector("input");
                    target.focus();
                  }
                }}
                name="user-number"
              />
            </InputContainer>

            <InputContainer>
              <InputName>주소</InputName>
              <TextField
                type="address"
                variant="standard"
                className="input-item"
                ref={addressRef}
                name="user-address"
              />
            </InputContainer>

            <InputContainer
              className="form-center"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <InputName>성별</InputName>
              <Inputbox>
                <label>
                  남
                  <input
                    type="radio"
                    name="gender"
                    ref={genderRef}
                    value="male"
                    defaultChecked={true}
                  />
                </label>

                <label>
                  여<input type="radio" name="gender" value="female" />
                </label>
              </Inputbox>
            </InputContainer>
          </div>

          <br />

          <div className="inputContainer">
            <Button onClick={handleFormSubmit}>회원가입</Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Join;