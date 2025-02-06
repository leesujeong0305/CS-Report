import React, { useEffect, useState } from 'react';
import styles from './BottomSection.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { addBoard, deleteBoard, getAllBoard, updateBoard } from '../api/boardAPI';
import Pagination from '../pagenation/Pagination';

function BottomSection({ tableData, LoadAllBoard }) {
  const requestMailMapping = {
    1: '메일',
    2: '전화',
    99: '일반',
  };

  const stateMapping = {
    1: 'log',
    2: '알람',
    3: 'debug',
    4: '버그',
    5: '분석',
    6: '테스트',
    99: '일반',
  }

  const progressMapping = {
    1: '진행중',
    2: '완료',
    3: '취소',
  }

  const reviewMapping = {
    1: '접수',
    2: '컴펀 중',
    3: '컴펀 완료',
    4: '긴급 대응',
  }

  const siteMapping = {
    1: '파주[패턴]',
    2: '파주[레이저]',
    3: '구미[패턴]',
    4: '구미[레이저]',
  }

  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const [newRow, setNewRow] = useState({
    title: '', // 요청 제목
    requester: '', // 요청자
    request_mail: '', // 요청 메일
    request_date: '', // 요청 날짜
    state: '', // 상태
    manager: '', // 담당자
    state_progress: '', // 진행률
    review: '', // 검토 상태
    site: '', // 관련 사이트
  });

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setUpdateForm(false);
    setHighlightedFields([]);
    setNewRow({
      title: '', // 요청 제목
      requester: '', // 요청자
      request_mail: '', // 요청 메일
      request_date: '', // 요청 날짜
      state: '', // 상태
      manager: '', // 담당자
      state_progress: '', // 진행률
      review: '', // 검토 상태
      site: '', // 관련 사이트
    });
  };

  const [highlightedFields, setHighlightedFields] = useState([]);

    // 상태 관리: 비밀번호 입력 창 표시 여부
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [showDeletedPrompot, setShowDeletedPrompot] = useState(false);
    // 상태 관리: 비밀번호 입력 값
  const [passwordInput, setPasswordInput] = useState('')
  const [actionType, setActionType] = useState(''); // "add", "edit", "delete"
  const [currentRow, setCurrentRow] = useState(null); // 현재 수정/삭제할 행 데이터

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.max(1, Math.ceil(tableData.length / itemsPerPage));

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // 비밀번호 창 열기
  const openPasswordPrompt = (type = 'add', row = null) => {
    setActionType(type); // 액션 타입 설정
    setCurrentRow(row); // 현재 선택한 행 데이터 설정 (add는 null)
    
    setShowPasswordPrompt(true); // 비밀번호 창 표시
  };

  // 비밀번호 창 닫기
  const closePasswordPrompt = () => {
    setShowPasswordPrompt(false); // 비밀번호 창 숨김
    setPasswordInput(''); // 비밀번호 입력 초기화
    setActionType('');
    //setCurrentRow(null);
  };

  const closeDeletePrompt = () => {
    setShowDeletedPrompot(false);
  }

 // 비밀번호 확인 처리
 const handlePasswordSubmit = () => {
  if (passwordInput === '8877') {
    if (actionType === 'add') {
      setShowForm(true); // Add 버튼은 추가 폼 열기
    } else if (actionType === 'edit') {
      //alert(`수정 작업을 수행합니다: ${currentRow?.title}`);
      handleUpdate(currentRow);
      // Edit 작업 로직 추가
    } else if (actionType === 'delete') {
      //setTableData(tableData.filter((row) => row.id !== currentRow?.id));
      //alert(`삭제 작업을 완료했습니다: ${currentRow?.title}`);
      setShowDeletedPrompot(true);
    }
    closePasswordPrompt(); // 비밀번호 창 닫기
  } else {
    alert('비밀번호가 틀렸습니다.');
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
      setNewRow({ ...newRow, [name]: value });
  };

const handleAddRow = async () => {
    const rowToAdd = { ...newRow };

    // 비어있거나 "선택"인 필드를 확인
    const invalidFields = Object.keys(rowToAdd).filter(
      (key) => !rowToAdd[key] || rowToAdd[key] === "선택"
    );
  
    // 유효하지 않은 입력값이 있는 경우
    if (invalidFields.length > 0) {
      //alert(`다음 필드를 확인하세요: ${invalidFields.join(", ")}`); // 알람창 표시
      setHighlightedFields(invalidFields); // 강조 표시를 위한 상태 저장
      return; // 함수 종료
    }

    try {
      const newEntity = await addBoard(rowToAdd);
      //console.log('Board added:', newEntity);
    } catch (error) {
      alert('Failed to add board');
    }
  
    closeForm(); // 폼 닫기
    setCurrentRow(null);
    LoadAllBoard();
  };

  const handleUpdate = (rowData) => {
    // 기존 rowData에서 request_date만 변환
    const updatedRowData = { title: rowData.title, requester: rowData.requester, request_mail: rowData.request_mail,
      request_date: formatDateForInput(rowData.request_date), // request_date 변환
      state: rowData.state, manager: rowData.manager, state_progress: rowData.state_progress, site: rowData.site, review: rowData.review }
    // const updatedRowData = {
    //   ...rowData, // 기존 데이터 유지
    //   request_date: formatDateForInput(rowData.request_date), // request_date 변환
    // };
    setUpdateId(rowData.id);
    setNewRow(updatedRowData);
    setUpdateForm(true);
  }

  const handleUpdateRow = async () => {
    const rowToUpdate = { ...newRow };
  
    // 비어있거나 "선택"인 필드를 확인
    const invalidFields = Object.keys(rowToUpdate).filter(
      (key) => !rowToUpdate[key] || rowToUpdate[key] === "선택"
    );
  
    // 유효하지 않은 입력값이 있는 경우
    if (invalidFields.length > 0) {
      //alert(`다음 필드를 확인하세요: ${invalidFields.join(", ")}`); // 알람창 표시
      setHighlightedFields(invalidFields); // 강조 표시를 위한 상태 저장
      return; // 함수 종료
    }

    try {
      const newEntity = await updateBoard(updateId ,rowToUpdate);
      //console.log('Board updated:', newEntity);
    } catch (error) {
      alert('Failed to update board');
    }

    closeForm(); // 폼 닫기
    setCurrentRow(null);
    setUpdateId(0);
    LoadAllBoard();
  }

  const handleDeleteSubmit = async () => {
    
    try {
      const data = await deleteBoard(currentRow.id);
      //console.log('Board deleted:', data);
    } catch (error) {
      alert('Failed to delete board');
    }
    
    setShowDeletedPrompot(false);
    setCurrentRow(null);
  }

  const getInputClassName = (field) => {
    return highlightedFields.includes(field) ? styles.errorField : "";
  };

  const formatDate = (date) => {
    const utcDate = new Date(date);
    const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000); // UTC + 9시간
    return kstDate.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const formatDateForInput = (isoDateString) => {
    const utcDate = new Date(isoDateString);
  return utcDate.toISOString().split('T')[0]; // UTC 기준 "YYYY-MM-DD" 반환
  };

  return (
    <div className={styles.bottomSection}>
      <div className={styles.header}>
      <button className={styles.addButton} onClick={() => openPasswordPrompt('add')}>
          <FontAwesomeIcon icon={faPlus} className={styles.icon} /> Add
        </button>
      </div>

       {/* 비밀번호 입력 창 */}
       {showPasswordPrompt && (
        <div className={styles.passwordPrompt}>
          <h3>비밀번호 확인</h3>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="비밀번호 입력"
          />
          <div className={styles.buttonRow}>
            <button onClick={handlePasswordSubmit}>확인</button>
            <button onClick={closePasswordPrompt}>취소</button>
          </div>
        </div>
      )}

      {showDeletedPrompot && (
        <div className={styles.passwordPrompt}>
          <h3>{`삭제 하시겠습니까?`}</h3>
          
          <div className={styles.buttonRow}>
            <button onClick={handleDeleteSubmit}>확인</button>
            <button onClick={closeDeletePrompt}>취소</button>
          </div>
        </div>
      )}

      {(showForm || updateForm) && (
        <div className={styles.formContainer}>
          <div className={styles.form}>

            <h3 className={styles.formTitle}>{showForm ? `CS 접수 새로 추가하기` : `CS 수정하기`}</h3>

            {/* 1열: 제목 */}
            <div className={styles.row}>
              <div className={styles.column}>
                <label className="form-label" htmlFor="title">제목</label>
                <input
                  className={`${styles.formInput} ${getInputClassName('title')}`}
                  type="text"
                  name="title"
                  value={newRow.title}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* 2열: 요청자, 요청 메일 */}
            <div className={styles.row}>
              <div className={styles.column}>
            <label>요청자:</label>
                <input
                  className={`${styles.formInput} ${getInputClassName('requester')}`}
                  type="text"
                  name="requester"
                  value={newRow.requester}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.column}>
            <label>요청메일:</label>
                <select
                  className={`${styles.formInput} ${getInputClassName('request_mail')}`}
                  name="request_mail"
                  value={newRow.request_mail}
                  onChange={handleInputChange}
                >
                  <option value="">선택</option>
                  <option value="1">메일</option>
                  <option value="2">전화</option>
                  <option value="99">일반</option>
                </select>
              </div>
            </div>

            {/* 3열: 요청 날짜, 상태 */}
            <div className={styles.row}>
              <div className={styles.column}>
                <label>요청 날짜:</label>
                <input
                  className={`${styles.formInput} ${getInputClassName('request_date')}`}
                  type="date"
                  name="request_date"
                  value={newRow.request_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.column}>
                <label>상태:</label>
                <select
                  className={`${styles.formInput} ${getInputClassName('state')}`}
                  name="state"
                  value={newRow.state}
                  onChange={handleInputChange}
                >
                  <option value="">선택</option>
                  <option value="1">log</option>
                  <option value="2">알람</option>
                  <option value="3">debug</option>
                  <option value="4">버그</option>
                  <option value="5">분석</option>
                  <option value="6">테스트</option>
                  <option value="99">일반</option>
                </select>
              </div>
            </div>

            {/* 4열: 담당자, 진행률 */}
            <div className={styles.row}>
              <div className={styles.column}>
            <label>담당자:</label>
                <input
                  className={`${styles.formInput} ${getInputClassName('manager')}`}
                  type="text"
                  name="manager"
                  value={newRow.manager}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.column}>
            <label>진행률:</label>
                <select
                  className={`${styles.formInput} ${getInputClassName('state_progress')}`}
                  name="state_progress"
                  value={newRow.state_progress}
                  onChange={handleInputChange}
                >
                  <option value="">선택</option>
                  <option value="1">진행중</option>
                  <option value="2">완료</option>
                  <option value="3">취소</option>
                </select>
              </div>
            </div>

            {/* 5열: 검토 상태, 관련 사이트 */}
            <div className={styles.row}>
              <div className={styles.column}>
                <label>검토 상태:</label>
                <select
                  className={`${styles.formInput} ${getInputClassName('review')}`}
                  name="review"
                  value={newRow.review}
                  onChange={handleInputChange}
                >
                  <option value="">선택</option>
                  <option value="1">접수</option>
                  <option value="2">컴펀 중</option>
                  <option value="3">컴펀 완료</option>
                  <option value="4">긴급 대응</option>
                </select>
              </div>
              <div className={styles.column}>
                <label>사이트:</label>
                <select
                  className={`${styles.formInput} ${getInputClassName('site')}`}
                  name="site"
                  value={newRow.site}
                  onChange={handleInputChange}
                >
                  <option value="">선택</option>
                  <option value="1">파주[패턴]</option>
                  <option value="2">파주[레이저]</option>
                  <option value="3">구미[패턴]</option>
                  <option value="4">구미[레이저]</option>
                </select>
              </div>
            </div>

            {/* 등록/취소 버튼 */}
            <div className={styles.buttonRow}>
              {
                showForm && <button onClick={handleAddRow}>{`등록`}</button>
              }
              {
                updateForm && <button onClick={handleUpdateRow}>{`수정`}</button>
              }
            <button onClick={closeForm}>취소</button>
          </div>
        </div>
        </div>
      )}

      <table className={styles.table}>
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>요청자</th>
            <th>요청메일</th>
            <th>요청날짜</th>
            <th>분류</th>
            <th>담당자</th>
            <th>진행률</th>
            <th>검토</th>
            <th>사이트</th>
            <th>수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          {currentItems && currentItems.map((row, index) => (
            <tr key={index}>
              <td>{ tableData.length - (currentPage - 1) * itemsPerPage - index}</td>
              <td className="title" style={{ userSelect: 'text' }}>{row.title}</td> {/* 제목 왼쪽 정렬 */}
              <td>{row.requester}</td>
              <td>{requestMailMapping[row.request_mail]}</td>
              <td>{formatDate(row.request_date)}</td>
              <td>{stateMapping[row.state]}</td>
              <td>{row.manager}</td>
              <td style={progressMapping[row.state_progress] === '완료' ? {backgroundColor: '#FFD700'}: {}}>{progressMapping[row.state_progress]}</td>
              <td>{reviewMapping[row.review]}</td>
              <td>{siteMapping[row.site]}</td>
              <td>
                <button className={`${styles.button} ${styles.editButton}`} 
                   onClick={() => openPasswordPrompt('edit', row) // 비밀번호 확인
                    }>
                  <FontAwesomeIcon icon={faEdit} /> {/* 수정 아이콘 */}
                </button>
                <button className={`${styles.button} ${styles.deleteButton}`}
                   onClick={() => openPasswordPrompt('delete', row)}>
                  <FontAwesomeIcon icon={faTrash} /> {/* 삭제 아이콘 */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="pagination-container" style={{ textAlign: "center", flexGrow: 1 }}>
          <Pagination postsPerPage={itemsPerPage} totalPosts={tableData.length} paginate={paginate} currentPage={currentPage} />
        </div>
      </div>

    </div>
  );
}

export default BottomSection;
