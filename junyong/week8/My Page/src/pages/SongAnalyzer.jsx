import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGuitar } from "../GuitarContext";

// 간단한 가상 노래 데이터베이스
const SONG_DB = [
  {
    title: "I'm Sorry",
    bpm: 138,
    key: "A minor",
    chords: ["Am", "F", "C", "G"],
  },
  {
    title: "Rainbow",
    bpm: 92,
    key: "G major",
    chords: ["G", "D", "Em", "C"],
  },
  {
    title: "Shape of You",
    bpm: 96,
    key: "C# minor",
    chords: ["C#m", "F#m", "A", "B"],
  },
];

function SongAnalyzer() {
  const navigate = useNavigate();
  const { setSongTitle, setSongInfo } = useGuitar();

  const [inputTitle, setInputTitle] = useState("");
  const [difficulty, setDifficulty] = useState("easy"); // 난이도
  const [analyzed, setAnalyzed] = useState(null); // 화면에 보여줄 분석 결과

  const handleAnalyze = (e) => {
    e.preventDefault();

    const trimmed = inputTitle.trim();
    if (!trimmed) {
      alert("노래 제목을 입력해주세요!");
      return;
    }

    // 대소문자 무시하고 검색
    const found = SONG_DB.find(
      (song) => song.title.toLowerCase() === trimmed.toLowerCase()
    );

    let result;
    if (found) {
      result = {
        ...found,
        difficulty,
        source: "db", // 어디서 가져왔는지 표시용
      };
    } else {
      // 없는 곡이면 기본 추천값
      result = {
        title: trimmed,
        bpm: difficulty === "easy" ? 80 : difficulty === "normal" ? 110 : 140,
        key: "C major",
        chords: ["C", "F", "G", "Am"],
        difficulty,
        source: "generated",
      };
    }

    // Context에 저장 → 다른 페이지(Practice)에서 사용
    setSongTitle(result.title);
    setSongInfo(result);
    setAnalyzed(result); // 현재 페이지에도 결과 표시
  };

  const goPractice = () => {
    if (!analyzed) {
      alert("먼저 곡을 분석해주세요!");
      return;
    }
    navigate("/practice");
  };

  return (
    <div>
      <h2>1. 곡 분석하기</h2>
      <form onSubmit={handleAnalyze} style={{ marginBottom: "16px" }}>
        <div style={{ marginBottom: "8px" }}>
          <label>
            노래 제목:&nbsp;
            <input
              type="text"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)} // onChange 이벤트
              placeholder="예: I'm Sorry"
              style={{ width: "220px" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "8px" }}>
          <span>난이도:&nbsp;</span>
          <label>
            <input
              type="radio"
              name="difficulty"
              value="easy"
              checked={difficulty === "easy"}
              onChange={(e) => setDifficulty(e.target.value)}
            />
            쉬움
          </label>
          &nbsp;
          <label>
            <input
              type="radio"
              name="difficulty"
              value="normal"
              checked={difficulty === "normal"}
              onChange={(e) => setDifficulty(e.target.value)}
            />
            보통
          </label>
          &nbsp;
          <label>
            <input
              type="radio"
              name="difficulty"
              value="hard"
              checked={difficulty === "hard"}
              onChange={(e) => setDifficulty(e.target.value)}
            />
            어려움
          </label>
        </div>

        <button type="submit">분석하기</button> {/* onClick 역할 */}
      </form>

      {/* 조건부 렌더링: analyzed가 있을 때만 결과 보여주기 */}
      {analyzed && (
        <div style={{ border: "1px solid #ddd", padding: "12px" }}>
          <h3>분석 결과</h3>
          <p><strong>곡 제목:</strong> {analyzed.title}</p>
          <p><strong>BPM:</strong> {analyzed.bpm}</p>
          <p><strong>Key:</strong> {analyzed.key}</p>
          <p>
            <strong>추천 코드 진행:</strong>{" "}
            {analyzed.chords.join(" - ")}
          </p>
          <p>
            <strong>난이도:</strong>{" "}
            {analyzed.difficulty === "easy"
              ? "쉬움 (기본 코드 스트로크 추천)"
              : analyzed.difficulty === "normal"
              ? "보통 (16비트 스트로크 연습)"
              : "어려움 (아르페지오 / 리프 연습)"}
          </p>
          <p style={{ fontSize: "12px", color: "#777" }}>
            데이터 출처: {analyzed.source === "db" ? "내장 DB" : "기본 추천값"}
          </p>

          <button style={{ marginTop: "8px" }} onClick={goPractice}>
            이 곡으로 연습하러 가기
          </button>
        </div>
      )}
    </div>
  );
}

export default SongAnalyzer;
