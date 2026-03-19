import React from 'react';
import { FILTER_CONFIG } from './FilterOptions'; // 아까 만든 상수 파일
import styles from './BottomSection.module.css'; // 기존 스타일 같이 사용

const FilterGroup = ({ filters, onFilterChange }) => {
  return (
    <div className={styles.filterGroup}>
      {/* 담당자 검색 */}
      <input 
        name="manager"
        placeholder="담당자 검색"
        value={filters.manager}
        onChange={onFilterChange}
        className={styles.filterInput}
      />

      {/* 셀렉트 박스들 */}
      {FILTER_CONFIG.map((filter) => (
        <select 
          key={filter.name}
          name={filter.name}
          value={filters[filter.name]}
          onChange={onFilterChange}
          className={styles.filterSelect}
        >
          <option value="">{filter.label}</option>
          {filter.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default FilterGroup;