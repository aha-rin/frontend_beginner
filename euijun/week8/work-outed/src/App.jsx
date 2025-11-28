// import
import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// 전역 보관할 컨텍스트 생성
const WorkOutedContext = createContext();

// 임시 DB용 커스텀 훅
function useLocalState(key, initialValue) {
  // 저장 데이터가 있으면 불러오고, 없으면 초기값 사용
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    }
    catch {
      return initialValue;
    }
  });

  // 값이 바뀔 때마다 DB에 저장
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    }
    catch { }
  }, [key, value]);

  return [value, setValue];
}

// App
export default function App() {
  // 운동 정보, 유저 정보, 운동 기록 
  const [exercises, setExercises] = useLocalState("exercises", []);
  const [user, setUser] = useLocalState("user", { name: "", login: false, weeklyAttendance: 3 });
  const [records, setRecords] = useLocalState("records", {});

  return (
    <WorkOutedContext.Provider value={{ exercises, user, records, setExercises, setUser, setRecords }}>
      <Router>
        {/* 상단 네비게이션 영역 */}
        <header className="nav">
          <div className="brand"><Link to="/" className="brand-link">WorkOuted</Link></div>
          <nav className="nav-links">
            <Link to="/today">Today</Link>
            <Link to="/stats">Status</Link>
          </nav>
        </header>
        {/* 메인 영역 */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/today" element={<Today />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </main>
      </Router>
    </WorkOutedContext.Provider>
  );
}

// Home 페이지: 로그인, 운동 목표 설정
function Home() {
  const { exercises, setExercises, user, setUser } = useContext(WorkOutedContext);

  const [name, setName] = useState(user.name || "");
  const [weeklyAttendance, setWeeklyAttendance] = useState(user.weeklyAttendance ?? 3);
  const [newExercise, setNewExercise] = useState("");

  // user 정보 바뀌면 
  useEffect(() => {
    setName(user.name || "");
    setWeeklyAttendance(user.weeklyAttendance ?? 3);
  }, [user]);

  // 로그인
  const login = () => {
    if (!name.trim()) return alert("닉네임을 입력 해 주세요");
    const s = Math.max(1, Number(weeklyAttendance) || 1);
    setUser({ name: name.trim(), login: true, weeklyAttendance: s });
    alert("저장되었습니다");
  };

  // 로그아웃
  const logout = () => setUser((prev) => ({ ...prev, name: "", login: false }));

  // 운동 추가
  const addExercise = () => {
    if (!newExercise.trim()) return;
    if (exercises.find((e) => e.name === newExercise.trim())) {
      return alert("이미 설정된 운동입니다");
    }
    setExercises((p) => [...p, { name: newExercise.trim(), weeklyGoal: 20 }]);
    setNewExercise("");
  };

  // 운동 삭제
  const deleteExercise = (name) => {
    if (!confirm(`${name} 운동을 삭제하시겠습니까?`)) return;
    setExercises((p) => p.filter((e) => e.name !== name));
  };

  // 목표 점수 변경
  const changeGoal = (name, goal) => {
    setExercises((p) =>
      p.map((e) => e.name === name ? { ...e, weeklyGoal: Number(goal) } : e)
    );
  };

  // 렌더
  return (
    <div className="page">
      <h1>Home</h1>

      {/* 사용자 설정 섹션 */}
      <section className="card">
        {/* 로그인/목표 설정 */}
        {!user.login ? (
          <>
            <p className="help">닉네임과 목표를 입력해주세요!</p>
            <div className="row" style={{ marginTop: 8 }}>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="닉네임 입력" />
              <input
                style={{ width: 120 }}
                type="number"
                min="1"
                value={weeklyAttendance}
                onChange={(e) => setWeeklyAttendance(e.target.value)}
              />
              <button onClick={login}>저장 및 로그인</button>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 18, fontWeight: 800 }}>{user.name}님, 어서오세요!</div>
            <div className="help-small" style={{ marginTop: 6 }}>
              주당 목표 출석: <strong>{user.weeklyAttendance ?? 3}</strong> 회
            </div>

            {/* 로그아웃/목표 수정 */}
            <div style={{ marginTop: 8 }}>
              <button className="secondary" onClick={logout}>로그아웃</button>
              <button
                style={{ marginLeft: 8 }}
                onClick={() => {
                  const s = prompt("주당 목표 출석 횟수를 입력해주세요", String(user.weeklyAttendance ?? 3));
                  if (s !== null) {
                    const ns = Math.max(1, Number(s) || 1);
                    setUser({ ...user, weeklyAttendance: ns });
                  }
                }}
              >
                목표 수정
              </button>
            </div>
          </>
        )}
      </section>

      {/* 운동 설정 섹션 */}
      <section style={{ marginTop: 18 }}>
        <h2>타겟 부위 및 목표 설정</h2>
        <p className="help">타겟 부위의 주간 목표 점수를 설정 해 보세요!</p>
        <div className="home-goals" style={{ marginTop: 8 }}>
          {/* 운동 리스트 */}
          {exercises.map((ex) => (
            <div key={ex.name} className="goal-card">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontWeight: 700 }}>{ex.name}</div>
                <button className="del-btn" onClick={() => deleteExercise(ex.name)}>－</button>
              </div>

              <div style={{ marginTop: 8 }}>
                <label className="help">주간 목표 점수</label><br />
                <input
                  type="number"
                  min="0"
                  value={ex.weeklyGoal}
                  onChange={(e) => changeGoal(ex.name, e.target.value)}
                />
              </div>
            </div>
          ))}

          {/* 운동 추가 */}
          <div className="goal-card add-card">
            <input
              placeholder="종목 추가 (ex: 가슴, 등)"
              value={newExercise}
              onChange={(e) => setNewExercise(e.target.value)}
            />
            <button style={{ marginTop: 8 }} onClick={addExercise}>＋ 추가</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Today 페이지: 운동 기록 입력
function Today() {
  const { exercises, records, setRecords } = useContext(WorkOutedContext);

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const todayRecords = Array.isArray(records[today]) ? records[today] : [];

  const [currentPart, setCurrentPart] = useState(exercises[0] ? exercises[0].name : "");
  const [currentScore, setCurrentScore] = useState(0);
  const [entries, setEntries] = useState(() => [...todayRecords]);
  const [adding, setAdding] = useState(false);

  // records가 바뀌면 entries 동기화
  useEffect(() => {
    setEntries([...todayRecords]);
  }, [records, today]);

  // 타겟 부위 바뀌면 슬라이더 최대값 조정
  useEffect(() => {
    const ex = exercises.find((e) => e.name === currentPart);
    const maxVal = ex ? ex.weeklyGoal + 1 : 0;
    if (currentScore > maxVal) {
      setCurrentScore(maxVal);
    }
  }, [currentPart, exercises]);

  // 슬라이더 오픈
  const onChipClick = (part) => {
    setCurrentPart(part);
    setCurrentScore(0);
    setAdding(true);
  };

  // 기록 추가
  const addEntry = () => {
    if (!currentPart) return alert("종목을 선택하세요");
    const payload = {
      part: currentPart,
      score: Number(currentScore),
      timestamp: new Date().toISOString()
    };
    const newList = [...entries, payload];
    setEntries(newList);
    setRecords({ ...records, [today]: newList });
    setAdding(false);
  };

  // 기록 삭제
  const removeEntry = (index) => {
    const newList = entries.filter((_, i) => i !== index);
    setEntries(newList);
    setRecords({ ...records, [today]: newList });
  };

  return (
    <div className="page">
      <h1>Today</h1>
      <p className="help">오늘 운동한 부위를 선택하여 성취도를 입력할 수 있습니다</p>
      {/* 오늘의 기록 확인 섹션*/}
      <section className="card" style={{ marginTop: 12 }}>
        <h3>오늘의 Work Outed</h3>
        {entries.length === 0 ? (
          <p className="help">오늘의 Work Out을 기록하세요!</p>
        ) : (
          <ul>
            {entries.map((entry, index) => (
              <li key={index}>
                <strong>{entry.part}</strong> — {entry.score}점
                <button className="secondary" onClick={() => removeEntry(index)}>삭제</button>
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* 운동 기록 입력 섹션 */}
      <section className="card" style={{ marginTop: 12 }}>
        <h3>오늘은 어디를 운동하셨나요?</h3>
        {exercises.length === 0 ? (
          <p className="help">먼저 홈에서 타겟 부위를 설정해주세요!</p>
        ) : (
          <>
            {/* 운동 부위 칩 */}
            <div className="tag-row">
              {exercises.map((e) => (
                <button
                  key={e.name}
                  className={`chip ${currentPart === e.name && adding ? "chip--active" : ""}`}
                  onClick={() => onChipClick(e.name)}
                >
                  {e.name}
                </button>
              ))}
            </div>
            {/* 슬라이더 입력 */}
            {adding && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontWeight: 700 }}>
                  {currentPart} 목표: {exercises.find((e) => e.name === currentPart)?.weeklyGoal ?? 0}점
                </div>
                <label className="help">0 ~ (목표+1) 점</label>
                <input
                  type="range"
                  min="0"
                  max={(exercises.find((e) => e.name === currentPart)?.weeklyGoal ?? 0) + 1}
                  value={currentScore}
                  onChange={(e) => setCurrentScore(Number(e.target.value))}
                  style={{ width: "100%" }}
                />
                <div style={{ marginTop: 6 }}>
                  선택 점수: <strong>{currentScore}</strong>
                </div>
                <div className="row" style={{ marginTop: 10 }}>
                  <button onClick={addEntry}>이 기록 저장</button>
                  <button className="secondary" onClick={() => setAdding(false)}>취소</button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

// Stats 페이지: 통계
function Stats() {
  const { records, exercises } = useContext(WorkOutedContext);

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => setSelectedDay(null), [month, year]);

  const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const firstWeekDay = (y, m) => new Date(y, m, 1).getDay();
  const dim = daysInMonth(year, month);
  const first = firstWeekDay(year, month);

  // 달력 셀
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= dim; d++) {
    const date = new Date(year, month, d).toISOString().slice(0, 10);
    const dateRec = Array.isArray(records[date]) ? records[date] : [];
    const dateTotalScore = dateRec.reduce((acc, curr) => acc + Number(curr.score || 0), 0);

    const partMap = {};
    dateRec.forEach((rec) => {
      const p = rec.part;
      partMap[p] = (partMap[p] || 0) + Number(rec.score || 0);
    });
    const partsWithScores = Object.keys(partMap).map(
      (p) => `${p} (${partMap[p]})`
    );
    cells.push({ date, dateTotalScore, dateRec, partsWithScores });
  }
  while (cells.length % 7 !== 0) cells.push(null);

  // 이번 주 시작일, 종료일 반환
  const getCurrentWeekRange = () => {
    const now = new Date();
    const day = now.getDay();
    const diffToMon = (day + 6) % 7;

    const mon = new Date(now);
    mon.setDate(now.getDate() - diffToMon);
    const sun = new Date(mon);
    sun.setDate(mon.getDate() + 6);

    return [mon, sun];
  };
  const [weekStart, weekEnd] = getCurrentWeekRange();

  // 주간 총합 계산
  const computeWeekTotals = () => {
    const totals = {};
    exercises.forEach((e) => totals[e.name] = 0);

    Object.keys(records).forEach((dateString) => {
      const d = new Date(dateString + "T00:00:00");
      if (d >= weekStart && d <= weekEnd) {
        (records[dateString] || []).forEach((record) => {
          totals[record.part] += Number(record.score || 0);
        });
      }
    });
    return totals;
  };

  const weekTotals = computeWeekTotals();

  return (
    <div className="page">
      <h1>Status</h1>

      {/* 캘린더 */}
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
          <div key={w} className="wk">{w}</div>
        ))}

        {cells.map((c, idx) => {
          if (!c) return <div key={idx} className="cell empty"></div>;
          const active = c.dateTotalScore > 0;
          const shown = (c.partsWithScores || []).slice(0, 3);

          return (
            <div
              key={idx}
              className={`cell ${active ? "cell--active" : ""}`}
              onClick={() => setSelectedDay(c.date)}
            >
              <div className="cell-day">{c.date.slice(-2)}</div>
              <div className="parts">
                {shown.length > 0 ? shown.join(", ") : "기록 없음"}
              </div>
            </div>
          );
        })}
      </div>

      {/* 날짜 클릭 시 상세 표시 */}
      <div style={{ marginTop: 18 }}>
        {selectedDay ? (
          <>
            <h3>{selectedDay}의 기록</h3>
            {(records[selectedDay] || []).length > 0 ? (
              <div className="card">
                <ul>
                  {records[selectedDay].map((r, i) => (
                    <li key={i}>
                      <strong>{r.part}</strong> — {r.score}점
                    </li>
                  ))}
                </ul>
              </div>
            ) : <div className="card">기록 없음</div>}
          </>
        ) : (
          <p className="help">날짜를 클릭하여 상세 기록을 확인할 수 있습니다</p>
        )}
      </div>

      {/* 주간 통계 */}
      <section style={{ marginTop: 18 }}>
        <h2>이번 주 통계</h2>
        <div className="status-list">
          {exercises.map((ex) => {
            const total = weekTotals[ex.name];
            const goal = ex.weeklyGoal;
            const pct = goal ? Math.round((total / goal) * 100) : 0;
            const done = total >= goal;

            return (
              <div key={ex.name} className={`goal-card ${done ? "done" : ""}`}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>{ex.name}</div>
                  <div>{done ? "완료" : `${goal - total} 남음`}</div>
                </div>

                <div>이번 주 누적: {total} / {goal}</div>

                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${pct}%` }}></div>
                </div>
                <div>{pct}% 달성</div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}