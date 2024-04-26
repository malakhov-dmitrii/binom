import { useRouter } from 'next/router';
import { fetchPosts } from './api';
import { useQuery } from 'react-query';

const useHomePageData = () => {
  const router = useRouter();
  // const page = router.query || '1';
  // const pageSize = router.query || '10'; 
  const { page, pageSize } = router.query;
  const q = useQuery(['blogs', page, pageSize], () =>
    fetchPosts(Number(page), Number(pageSize))
  );
  return {
    ...q,
    page: page ? Number(page) : 1,
    pageSize: pageSize ? Number(pageSize) : 10,
  };
};

export default useHomePageData;
