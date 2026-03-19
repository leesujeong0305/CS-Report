// filterOptions.js

export const FILTER_CONFIG = [
  {
    name: 'state',
    label: '전체 분류',
    options: [
      { value: '1', label: '로그' },
      { value: '2', label: '알람' },
      { value: '3', label: '디버그' },
      { value: '4', label: '버그' },
      { value: '5', label: '분석' },
      { value: '6', label: '테스트' },
      { value: '99', label: '기타' },
    ]
  },
  {
    name: 'state_progress',
    label: '전체 진행률',
    options: [
      { value: '1', label: '진행중' },
      { value: '2', label: '완료' },
      { value: '3', label: '취소' },
    ]
  },
  {
    name: 'site',
    label: '전체 사이트',
    options: [
      { value: '1', label: '파주[패턴]' },
      { value: '2', label: '파주[레이저]' },
      { value: '3', label: '구미[패턴]' },
      { value: '4', label: '구미[레이저]' },
    ]
  },
  {
    name: 'review',
    label: '전체 검토',
    options: [
      { value: '1', label: '접수' },
      { value: '2', label: '컨펌 중' },
      { value: '3', label: '컨펌 완료' },
      { value: '4', label: '긴급 대응' },
    ]
  }
];