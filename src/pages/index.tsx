import { useQuery } from 'react-query';
import { fetchPosts } from '../helpers/api';
import Blog from '../components/blog/Blog';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { BlogsProps } from '../components/blog/Blog.props';
import React from 'react';
import { Flex } from 'antd';
import { Pagination } from 'antd';
import { PaginationProps } from 'antd';
import Loading from '@/components/loading/Loading';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import useHomePageData from '@/helpers/hooks';

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
  const { page, pageSize } = ctx.query;
  const queryClient = new QueryClient();

  queryClient.prefetchQuery(['blogs', page, pageSize], () =>
    fetchPosts(page, pageSize)
  );
  return {
    props: {
      dehydrateState: dehydrate(queryClient),
    },
  };
};
