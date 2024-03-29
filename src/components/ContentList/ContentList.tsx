import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styles from './lib/contentList.module.css';
import useContentList from 'hooks/useContent/contentsList';
import useHeartAnimation from 'hooks/useHeartAnimation/useHeartAnimation';
import useContentSearch from 'hooks/useContent/contentSearch';

const ContentList = () => {
  useHeartAnimation();
  const [currentPage, setCurrentPage] = useState(1);
  const { contentList } = useContentList(currentPage);
  const { keyword, handleKeywordChange } = useContentSearch();

  const filteredContentList = contentList.filter((content) =>
    content.title.includes(keyword)
  );
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search content"
            value={keyword}
            onChange={(e) => handleKeywordChange(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.no}>No.</th>
              <th className={styles.title}>Title</th>
              <th>User</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredContentList.map((content, index) => (
              <tr key={content.id}>
                <td>{index + 1}</td>
                <td className={styles.centerAlign}>
                  <Link to={`/content/${content.id}`} className={styles.link}>
                    {content.title.length > 10 ? content.title.slice(0, 50) + '...' : content.title}
                  </Link>
                </td>
                <td className={styles.username}>{content.user_name}</td>
                <td className={styles.updateAt}>
                  {moment(content.updated_at).format('YYYY-MM-DD HH:mm:ss')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.pagination}>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={filteredContentList.length < 10}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ContentList;
