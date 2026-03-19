import * as XLSX from 'xlsx-js-style';

const Excelexport = (tableData) => {
  if (!tableData || tableData.length === 0) return;

  const stateMapping = { 1: '로그', 2: '알람', 3: '디버그', 4: '버그', 5: '분석', 6: '테스트', 99: '기타' };
  const siteMapping = { 1: '파주[패턴]', 2: '파주[레이저]' };

  const workbook = XLSX.utils.book_new();

  Object.keys(siteMapping).forEach((siteKey) => {
    const originalSiteName = siteMapping[siteKey];
    const safeSheetName = originalSiteName.replace(/[\[\]\:\?\*\\\/]/g, '_');
    
    const filteredData = tableData
      .filter(item => String(item.site) === String(siteKey))
      .reverse();

    if (filteredData.length > 0) {
      // --- 1. 통계 계산 (분류별 & 월별) ---
      const stateStats = { '로그': 0, '알람': 0, '디버그': 0, '버그': 0, '분석': 0, '테스트': 0, '기타': 0 };
      const monthStats = {}; // { '2026-02': 5, '2026-03': 12 } 형태

      filteredData.forEach(item => {
        // 분류 집계
        const label = stateMapping[item.state] || '기타';
        stateStats[label]++;

        // 월별 집계 (request_date: "+2026-02-06..." -> "2026-02")
        const datePart = (item.request_date || "").replace(/[^\d-]/g, '');
        if (datePart.length >= 7) {
          const month = datePart.slice(0, 7); 
          monthStats[month] = (monthStats[month] || 0) + 1;
        }
      });

      // --- 2. 시트 데이터 구성 (상단 요약 영역) ---
      const sheetArray = [
        ["[ 분류별 요약 ]", "", "[ 월별 건수 요약 ]"], // 1행 타이틀
        ["분류", "건수", "", "월", "건수"],           // 2행 헤더
      ];

      // 분류 통계와 월별 통계 중 더 긴 것을 기준으로 행 생성
      const stateEntries = Object.entries(stateStats);
      const monthEntries = Object.entries(monthStats).sort(); // 월순 정렬
      const maxRows = Math.max(stateEntries.length, monthEntries.length);

      for (let i = 0; i < maxRows; i++) {
        const row = [];
        row[0] = stateEntries[i] ? stateEntries[i][0] : ""; // 분류명
        row[1] = stateEntries[i] ? stateEntries[i][1] : ""; // 분류건수
        row[2] = "";                                        // 공백 열
        row[3] = monthEntries[i] ? monthEntries[i][0] : ""; // 월 (YYYY-MM)
        row[4] = monthEntries[i] ? monthEntries[i][1] : ""; // 월건수
        sheetArray.push(row);
      }

      sheetArray.push([]); // 빈 줄
      sheetArray.push(["No", "제목", "요청자", "요청날짜", "분류", "담당자", "진행률", "검토", "사이트"]);

      // --- 3. 리스트 데이터 추가 ---
      filteredData.forEach((item, index) => {
        sheetArray.push([
          index + 1,
          item.title || "",
          item.requester || "",
          //item.request_mail || "",
          (item.request_date || "").replace(/[^\d-]/g, '').slice(0, 10),
          stateMapping[item.state] || item.state,
          item.manager || "",
          item.state_progress, 
          item.review,
          originalSiteName
        ]);
      });

      const worksheet = XLSX.utils.aoa_to_sheet(sheetArray);

      // --- 4. 스타일 및 레이아웃 ---
      const headerStyle = {
        fill: { fgColor: { rgb: "4F81BD" } },
        font: { bold: true, color: { rgb: "FFFFFF" } },
        alignment: { horizontal: "center" },
        border: { top: {style: "thin"}, bottom: {style: "thin"}, left: {style: "thin"}, right: {style: "thin"} }
      };

      const range = XLSX.utils.decode_range(worksheet['!ref']);
      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const addr = XLSX.utils.encode_cell({ r: R, c: C });
          if (!worksheet[addr]) continue;
          worksheet[addr].s = { alignment: { horizontal: "center" }, font: { name: "맑은 고딕", sz: 10 } };

          // 요약 표 헤더 스타일 (분류/건수, 월/건수)
          if (R === 1 && (C <= 1 || (C >= 3 && C <= 4))) {
            worksheet[addr].s.fill = { fgColor: { rgb: "D9D9D9" } };
            worksheet[addr].s.font = { bold: true };
          }
          // 메인 리스트 헤더 스타일 (No, 제목...) - 현재 위치는 요약 행 + 2 (빈줄) 위치
          if (R === maxRows + 3) worksheet[addr].s = headerStyle;
        }
      }

      worksheet['!cols'] = [{wch:5}, {wch:45}, {wch:15}, {wch:15}, {wch:10}, {wch:12}, {wch:10}, {wch:12}, {wch:15}];
      XLSX.utils.book_append_sheet(workbook, worksheet, safeSheetName);
    }
  });

  XLSX.writeFile(workbook, `CS_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
};

export default Excelexport;