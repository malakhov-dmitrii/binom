import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { fetchPost } from '../../helpers/api';
import BlogCard from '../../components/blogCard/BlogCard';
import Loading from '@/components/loading/Loading';
import { dehydrate, QueryClient } from '@tanstack/react-query';

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const { data, status } = useQuery(['blog', id], fetchPost(id));
  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <p>Error</p>;
  }
  if (status === 'success') {
    const [id, photo_url, title, description, updated_at] = data.blog
    return (
      <div>
        <BlogCard
          id={id}
          image={photo_url}
          title={title}
          description={description}
          date={updated_at}
        />
      </div>
    );
  }
};

export default PostPage;

export const getStaticProps = async (ctx) => {
  const [id] = ctx.query;
  const queryClient = new QueryClient();

  queryClient.prefetchQuery(['blog', id], () => fetchPost(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
