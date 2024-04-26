import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { fetchPosts } from './api';

const useHomePageData = () => {
  const router = useRouter();
  const { page, pageSize } = router.query;
  const q = useQuery(['blogs', page, pageSize], () =>
    fetchPosts(page, pageSize)
  );
  return {
    ...q,
    page: page ? Number(page) : 5,
    pageSize: pageSize ? Number(pageSize) : 10,
  };
};

export default useHomePageData;
