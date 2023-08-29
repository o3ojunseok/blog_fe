import { useContentList } from "../../hooks/contentsList/useContentsList"
import Styles from './lib/contentList.module.css';

const ContentList = () => {
  const { contentList, loading } = useContentList();

  return (
    <div className={Styles.contentListContainer}>
      <h1 className={Styles.contentListItem}>Content List</h1>
      {loading ? (
        <p className={Styles.contentListItem}>Loading...</p>
      ) : (
        <ul>
          {contentList.map((content) => (
            <li key={content.id}>
              <h2 className={Styles.contentListItem}>{content.title}</h2>
              <p className={Styles.contentListItem}>{content.content}</p>
              <p >User: {content.user_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default ContentList