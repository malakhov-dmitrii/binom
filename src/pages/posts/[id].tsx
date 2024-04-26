import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { fetchPost } from '../../helpers/api';
import BlogCard from '../../components/blogCard/BlogCard';
import { LoadingOutlined } from '@ant-design/icons';
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
    return (
      <div>
        <BlogCard
          id={data.blog.id}
          image={data.blog.photo_url}
          title={data.blog.title}
          description={data.blog.description}
          date={data.blog.updated_at}
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
