import { authenticatedUserState } from "hooks/store/store";
import { useEffect, useState } from "react";
import { useRecoilValue } from 'recoil';
import { CommentList } from "./lib/interface";
import useSwr from 'swr';

const useCommentList = (contentId: number) => {
  const user = useRecoilValue(authenticatedUserState);
  const [commentList, setCommentList] = useState<CommentList[]>([]); 
  const { data, error } = useSwr(`/comment/content/${contentId}`)

  useEffect(() => {
    if (data) {
      setCommentList(data);
    } 
  }, [data]);

  return { user, commentList }
}

export default useCommentList;