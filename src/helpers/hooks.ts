import { useRouter } from 'next/router';
import { fetchPosts } from './api';
import { useQuery } from 'react-query';

const useHomePageData = () => {
  const router = useRouter();
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


// const usePosts = (limit) => {
//   return useQuery({
//     queryKey: ['posts', limit],
//     queryFn: () => fetchPosts(limit),
//   })
// }


export default useHomePageData;
