import React from 'react';
import { Link } from 'react-router-dom';
import { List, Spin, Typography, Card, Space } from 'antd';
import { useContentList } from 'hooks/contentsList/useContentsList';
import moment from 'moment';
const { Text } = Typography;

const ContentList = () => {
  const { contentList, loading } = useContentList();

  return (
    <div>
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <List
          itemLayout="vertical"
          dataSource={contentList}
          renderItem={(content, index) => (
            <List.Item key={content.id}>
              <Link to={`/content/${content.id}`}>
                <Card>
                  <Card.Meta
                    title={content.title}
                    description={
                      <Space>
                        <Text>User: {content.user_name}</Text>
                        <span>{moment(content.updated_at).format('YYYY-MM-DD')}</span>
                      </Space>
                    }
                  />
                </Card>
              </Link>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default ContentList;
