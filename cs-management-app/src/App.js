import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import MiddleSection from './components/MiddleSection';
import BottomSection from './components/BottomSection';
import styles from './App.module.css';
import { getAllBoard } from './api/boardAPI';
import LoadAllBoardModule from './components/LoadAllBoardModule';

function App() {

  // 상태를 App에서 관리
  const [tableData, setTableData] = useState([]);
    // const [tableData, setTableData] = useState([
    //   {
    //     id: 1,
    //     title: '[AP4][ELA] 로그 분석 요청',
    //     requester: '홍길동',
    //     requestMail: '메일',
    //     requestDate: '2025-01-22',
    //     state: 'log',
    //     manager: '김철수',
    //     stateProgress: '진행중',
    //     review: '접수',
    //     site: '파주[패턴]',
    //   },
    //   {
    //     id: 2,
    //     title: '[AP4][RPR] 알람 처리 요청',
    //     requester: '이영희',
    //     requestMail: '전화',
    //     requestDate: '2025-01-21',
    //     state: '알람',
    //     manager: '박영수',
    //     stateProgress: '완료',
    //     review: '검토중',
    //     site: '파주[레이저]',
    //   },
    //   {
    //     id: 3,
    //     title: '[AP5][패턴] 디버그 요청',
    //     requester: '최민수',
    //     requestMail: '일반',
    //     requestDate: '2025-01-20',
    //     state: 'debug',
    //     manager: '이정훈',
    //     stateProgress: '진행중',
    //     review: '완료',
    //     site: '구미[패턴]',
    //   },
    //   {
    //     id: 4,
    //     title: '[AP4][패턴] 버그 수정 요청',
    //     requester: '김은영',
    //     requestMail: '메일',
    //     requestDate: '2025-01-19',
    //     state: '버그',
    //     manager: '박지훈',
    //     stateProgress: '취소',
    //     review: '대기중',
    //     site: '구미[레이저]',
    //   },
    //   {
    //     id: 5,
    //     title: '[AP3][패턴] 테스트 진행 요청',
    //     requester: '이현수',
    //     requestMail: '전화',
    //     requestDate: '2025-01-18',
    //     state: '테스트',
    //     manager: '정소희',
    //     stateProgress: '완료',
    //     review: '완료',
    //     site: '파주[패턴]',
    //   },
    // ]);

    const LoadAllBoard = async () => {
      const data = await getAllBoard();
      setTableData(data);
    }

  return (
    <div className={styles.app}>
      <Header />

      <LoadAllBoardModule LoadAllBoard={LoadAllBoard} />
      <MiddleSection tableData={tableData} />
      <BottomSection tableData={tableData} LoadAllBoard={LoadAllBoard} />
    </div>
  );
}

export default App;