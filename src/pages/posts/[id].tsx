import { useRouter } from "next/router";
import { fetchPost } from "../../helpers/api";
import BlogCard from "../../components/blogCard/BlogCard";
import Loading from "@/components/loading/Loading";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchPost(id),
  });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <p>Error</p>;
  }
  const { id: blogId, photo_url, title, description, updated_at } = data.blog;
  return (
    <div>
      <BlogCard
        id={blogId}
        image={photo_url}
        title={title}
        description={description}
        date={updated_at}
      />
    </div>
  );
};

export default PostPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchPost(id),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
