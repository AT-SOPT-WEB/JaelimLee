import { useState, useEffect } from "react";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const searchAreaStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 17px;
  width: 100%;
`;

const mainStyle = css`
  background-color: rgb(235, 235, 235);
  width: 100%;
  height: 100vh;
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  gap: 26px;
  align-items: center;
`;

const inputBaseBallStyle = css`
  border-radius: 10px;
  padding: 15px;
  width: 50%;
`;

const resultStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%;
`;

const resultItemStyle = css`
  background-color: rgba(187, 222, 251, 0.49);
  border-radius: 17px;
`;

const gameResultTextStyle = css`
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  color: rgb(1, 36, 65);
`;

const strikeBallTextStyle = css`
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(1, 36, 65);
`;

const BaseballMain = () => {
  // 상태 관리
  const [numInput, setNumInput] = useState("");
  const [randomNumber, setRandomNumber] = useState("");
  const [gameResult, setGameResult] = useState([]);
  const [strikeBallCount, setStrikeBallCount] = useState({
    strike: 0,
    ball: 0,
  });
  const [strikeBallMessage, setStrikeBallMessage] = useState("");
  const [restartGame, setRestartGame] = useState(false);

  const generateRandomNumber = () => {
    const randomNumbers = [];
    while (randomNumbers.length < 3) {
      const num = Math.floor(Math.random() * 10);
      if (!randomNumbers.includes(num)) randomNumbers.push(num);
    }
    return randomNumbers.join("");
  };

  useEffect(() => {
    if (restartGame) {
      setGameResult([]);
      setStrikeBallMessage("");
    }
    const generatedNumber = generateRandomNumber();
    setRandomNumber(generatedNumber);
    console.log(generatedNumber);
  }, [restartGame]);

  const calculateStrikeBall = (userInput) => {
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < 3; i++) {
      if (userInput[i] === randomNumber[i]) {
        strike++;
      } else if (randomNumber.includes(userInput[i])) {
        ball++;
      }
    }
    return { strike, ball };
  };

  const handleUserInput = (e) => {
    setNumInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const inputArray = numInput.split("");
      const uniqueDigits = new Set(inputArray); // 중복 숫자 확인하기 !

      if (inputArray.length !== 3) {
        setStrikeBallMessage("3자리 숫자를 입력해주세요.");
        setNumInput("");
        return;
      } else if (uniqueDigits.size !== 3) {
        setStrikeBallMessage("중복된 숫자는 입력할 수 없습니다.");
        setNumInput("");
        return;
      }

      if (numInput.length === 3 && !/[^\d]/.test(numInput)) {
        const { strike, ball } = calculateStrikeBall(numInput);
        setStrikeBallCount({ strike, ball });

        const resultMessage = `${strike}S ${ball}B`;
        setGameResult((prevResults) => [...prevResults, resultMessage]);

        if (strike === 3) {
          setGameResult((prevResults) => [...prevResults, "정답입니다!"]);
          setStrikeBallMessage("3초 후 게임을 다시 시작하겠습니다.");
          setTimeout(() => {
            setRestartGame(true);
          }, 3000);
        } else {
          setStrikeBallMessage(`${strike} 스트라이크 ${ball} 볼`);
        }

        setNumInput("");
      } else {
        setStrikeBallMessage("3자리 숫자를 정확히 입력해주세요.");
      }
    }
  };

  return (
    <div css={mainStyle}>
      <div css={searchAreaStyle}>
        <input
          css={inputBaseBallStyle}
          type="text"
          placeholder="3자리 숫자를 입력해주세요."
          value={numInput}
          onChange={handleUserInput}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div css={strikeBallTextStyle}>
        <p>{strikeBallMessage}</p>
      </div>

      <div css={resultStyle}>
        {gameResult.map((result, index) => (
          <div key={index} css={resultItemStyle}>
            <p css={gameResultTextStyle}>{result}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaseballMain;
