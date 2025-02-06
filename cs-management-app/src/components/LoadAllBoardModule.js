import React, { useEffect } from 'react';
import { getAllBoard } from '../api/boardAPI';

function LoadAllBoardModule({ LoadAllBoard }){
  // 데이터 로드 함수


  useEffect(() => {
    LoadAllBoard();
  }, []);
};

export default LoadAllBoardModule;
