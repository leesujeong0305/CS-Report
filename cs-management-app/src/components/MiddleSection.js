import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // 플러그인 추가
import styles from "./Middle.module.css";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels); // 플러그인 등록

function MiddleSection({ tableData }) {

  const progressMapping = {
    1: '진행중',
    2: '완료',
    3: '취소',
  }

  const stateMapping = {
    1: 'log',
    2: '알람',
    3: 'debug',
    4: '버그',
    5: '분석',
    6: '테스트',
    99: '일반',
  }

  const siteMapping = {
    1: '파주[패턴]',
    2: '파주[레이저]',
    3: '구미[패턴]',
    4: '구미[레이저]',
  }


  // 1. 사이트별 데이터 계산
  const siteCounts = tableData.reduce((acc, row) => {
    const siteName = siteMapping[row.site];
    acc[siteName] = (acc[siteName] || 0) + 1; // 사이트별 개수 누적
    return acc;
  }, {});

  // 2. 분류(state)별 데이터 계산
  const stateCounts = tableData.reduce((acc, row) => {
    //const statePer = calculateStatusPercentage(row, row.state);
    const stateName = stateMapping[row.state];
    acc[stateName] = (acc[stateName] || 0) + 1; // 상태별 개수 누적
    return acc;
  }, {});

  // 3. 진행 상태(stateProgress) 데이터 계산
  const stateProgressCounts = tableData.reduce((acc, row) => {
    const progressName = progressMapping[row.state_progress];
    acc[progressName] = (acc[progressName] || 0) + 1; // 진행 상태별 개수 누적
    return acc;
  }, {});

  // 상태별 백분율을 계산하는 함수 추가
function calculateStatusPercentages(data, mapping) {
  const totalCount = data.length;  // 전체 데이터 개수

  // 상태별 개수 계산
  const statusCounts = data.reduce((acc, row) => {
    const statusName = mapping[row.state];
    acc[statusName] = (acc[statusName] || 0) + 1;
    return acc;
  }, {});

  // 상태별 백분율 계산
  const statusPercentages = {};
  for (const status in statusCounts) {
    statusPercentages[status] = ((statusCounts[status] / totalCount) * 100).toFixed(2);
  }

  return statusPercentages;
}

// 상태별 백분율 데이터 생성
const statePercentages = calculateStatusPercentages(tableData, stateMapping);


  // 4. 차트 데이터 생성
  const data1 = {
    labels: Object.keys(siteCounts),
    datasets: [
      {
        data: Object.values(siteCounts),
        backgroundColor: ["#4c6ef5", "#f59f00", "#d6336c", "#34c38f"],
        borderColor: ["#000000", "#000000", "#000000", "#000000"],
        borderWidth: 2,
      },
    ],
  };

  const data2 = {
    labels: Object.keys(stateCounts),
    datasets: [
      {
        data: Object.values(stateCounts),
        backgroundColor: ["#4c6ef5","#f59f00","#d6336c","#34c38f","#f06d99","#8e44ad","#2ecc71",],
        borderColor: ["#000000", "#000000", "#000000", "#000000"],
        borderWidth: 2,
      },
    ],
  };

  const data3 = {
    labels: Object.keys(stateProgressCounts),
    datasets: [
      {
        data: Object.values(stateProgressCounts),
        backgroundColor: ["#34c38f", "#f59f00", "#d6336c"],
        borderColor: ["#000000", "#000000", "#000000"],
        borderWidth: 2,
      },
    ],
  };

  // 5. 차트 옵션
  const options = {
    responsive: true,
    maintainAspectRatio: false, // 비율 고정 해제
    aspectRatio: 1, // 차트의 가로세로 비율 1:1로 강제
    layout: {
      padding: 5, // 차트 내부 여백 추가
    },
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 20,
          padding: 5,
        },
      },
      datalabels: {
        color: "#000000",
        font: {
          size: 12,
          weight: "bold",
    },
        formatter: (value) => `${value}건`,
      },
    },
  };

  //6. 분류 옵션
  const optionsWithPercent = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1, // 차트의 가로세로 비율 1:1로 강제
    layout: {
      padding: 5,
    },
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 20,
          padding: 5,
          font: {
            size: 14, // 글자 크기 조정 (필요 시)
          },
          // 최대 너비 및 스타일 설정으로 줄바꿈 방지
          usePointStyle: false,
          textAlign: 'left',
          generateLabels: function (chart) {
            const datasets = chart.data.datasets[0];
            const total = datasets.data.reduce((sum, value) => sum + value, 0);
  
            return chart.data.labels.map((label, index) => {
              const value = datasets.data[index];
              const percentage = ((value / total) * 100).toFixed(1);
              return {
                text: `${label} (${percentage}%)`,  // 범례 텍스트
                fillStyle: datasets.backgroundColor[index],
                strokeStyle: datasets.borderColor[index],
                lineWidth: 1,
                //hidden: !chart.getDatasetMeta(0).data[index].active,
              };
            });
          },
        },
      },
      datalabels: {
        color: "#000000",
        font: {
          size: 12,
          weight: "bold",
        },
        formatter: (value, context) => `${value}건`,
      },
    },
  };
  

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className={styles.middleSection}>
      {/* 현 날짜 카드 */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <p>Today's Date</p>
        </div>
        <div className={styles.cardBody}>
          <h2>{currentDate}</h2>
        </div>
      </div>

      {/* New Clients 카드 */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <p>Total Acceptance</p>
        </div>
        <div className={styles.cardBody}>
          <h2>{tableData.length}건</h2>
        </div>
      </div>

      {/* 차트 1 */}
      <div className={styles.chartContainer}>
        <h3 className={styles.chartTitle}>사이트</h3>
        <div className={styles.pieChart}>
          <Pie data={data1} options={options} />
        </div>
      </div>

      {/* 차트 2 */}
      <div className={styles.chartContainer}>
        <h3 className={styles.chartTitle}>분류</h3>
        <div className={styles.pieChart}>
          <Pie data={data2} options={optionsWithPercent} />
        </div>
      </div>

      {/* 차트 3 */}
      <div className={styles.chartContainer}>
        <h3 className={styles.chartTitle}>진행률</h3>
        <div className={styles.pieChart}>
          <Pie data={data3} options={options} />
        </div>
      </div>
    </div>
  );
}

export default MiddleSection;
