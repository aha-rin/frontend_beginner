// src/pages/Practice.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGuitar } from "../GuitarContext";

function Practice() {
  const navigate = useNavigate();
  const { songTitle, songInfo } = useGuitar();
  const [scaleType, setScaleType] = useState("pentatonic"); // pentatonic | chromatic | arpeggio

  // (선택 사항) 페이지 진입 시 한 번 실행되는 useEffect
  useEffect(() => {
    if (songInfo) {
      console.log(`연습 페이지 진입: ${songInfo.title} / BPM ${songInfo.bpm}`);
    }
  }, [songInfo]);

  // 곡 정보가 없는 상태로 들어온 경우
  if (!songInfo) {
    return (
      <div>
        <h2>2. 연습 페이지</h2>
        <p>아직 선택된 곡 정보가 없습니다.</p>
        <p>먼저 곡 분석 페이지에서 연습할 곡을 선택해주세요.</p>
        <button onClick={() => navigate("/")}>곡 분석하러 가기</button>
      </div>
    );
  }

  // 스케일별 설명/패턴
  const renderPattern = () => {
    if (scaleType === "pentatonic") {
      return (
        <div>
          <h3>펜타토닉 스케일 연습</h3>
          <p>
            Key: <strong>{songInfo.key}</strong> 기준 마이너 펜타토닉 1포지션(예시)
          </p>
          <pre>
            {`e|----------------5-8-
B|------------5-8-----
G|--------5-7---------
D|----5-7-------------
A|-5-8----------------
E|--------------------`}
          </pre>
          <p>메트로놈을 {songInfo.bpm} BPM의 50~60% 정도로 맞추고 천천히 연습해보세요.</p>
        </div>
      );
    }

    if (scaleType === "chromatic") {
      return (
        <div>
          <h3>크로매틱 연습</h3>
          <p>왼손 손가락 독립성을 기르기 위한 1-2-3-4 패턴입니다.</p>
          <pre>
            {`e|-5-6-7-8----------------
B|----------5-6-7-8--------
G|------------------5-6-7-8
D|-------------------------
A|-------------------------
E|-------------------------`}
          </pre>
          <p>{songInfo.bpm} BPM에서 시작해서, 익숙해지면 점점 올려보세요.</p>
        </div>
      );
    }

    // arpeggio
    return (
      <div>
        <h3>아르페지오 연습</h3>
        <p>추천 코드 진행: {songInfo.chords.join(" - ")}</p>
        <p>각 코드에 대해 아래와 같이 아르페지오를 연습해보세요 (예: C 코드 기준)</p>
        <pre>
          {`e|-----0-------
B|---1---1-----
G|-0-------0---
D|-------------
A|-------------
E|-------------`}
        </pre>
        <p>스트로크 대신 아르페지오로 연주하면서 리듬감을 살려보세요.</p>
      </div>
    );
  };

  return (
    <div>
      <h2>2. 연습 페이지</h2>
      <p>
        현재 연습 곡: <strong>{songTitle}</strong> ({songInfo.key}, {songInfo.bpm} BPM)
      </p>

      <div style={{ margin: "12px 0" }}>
        <span>연습 타입 선택:&nbsp;</span>
        <button
          onClick={() => setScaleType("pentatonic")}
          style={{ marginRight: "4px" }}
        >
          펜타토닉
        </button>
        <button
          onClick={() => setScaleType("chromatic")}
          style={{ marginRight: "4px" }}
        >
          크로매틱
        </button>
        <button onClick={() => setScaleType("arpeggio")}>
          아르페지오
        </button>
      </div>

      {/* 조건부 렌더링: scaleType 에 따라 다른 UI */}
      {renderPattern()}

      <button style={{ marginTop: "16px" }} onClick={() => navigate("/")}>
        다른 곡 선택하러 가기
      </button>
    </div>
  );
}

export default Practice;
