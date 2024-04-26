import Blog from "@/components/blog/Blog";
import { BlogsProps } from "@/components/blog/Blog.props";
import Loading from "@/components/loading/Loading";
import { fetchPosts } from "@/helpers/api";
import useHomePageData from "@/helpers/hooks";
import { Flex, Pagination } from "antd";
import { useRouter } from "next/router";
import { QueryClient, dehydrate } from "react-query";


export default function Home() {
  const router = useRouter();
  const { data, isLoading, error, page, pageSize } = useHomePageData();

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <p>Error</p>;
  }
  return (
    <Flex align="center" vertical>
      <Flex wrap="wrap" gap={50} flex="1 1 30%">
        {data.blogs?.map((blog: BlogsProps) => (
          <div key={blog.id} style={{ flex: '1 1 30%' }}>
            <Blog
              id={blog.id}
              image={blog.photo_url}
              title={blog.title}
              date={blog.updated_at}
            />
          </div>
        ))}
      </Flex>
      <Pagination
        current={page}
        defaultPageSize={pageSize}
        onChange={(current: number, pageSize: number) => {
          router.push({
            pathname: '/',
            query: { page: current, pageSize: pageSize },
          });
        }}
        total={data.total_blogs}
      />
    </Flex>
  );
}

export const getServerSideProps = async (ctx) => {
  const page = ctx.query.page || '1';
  const pageSize = ctx.query.pageSize || '10';
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['blogs', page, pageSize], () => fetchPosts(page, pageSize));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};