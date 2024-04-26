import '@/styles/globals.css';
import { ConfigProvider } from 'antd';
import theme from './theme/themeConfig';
import type { AppProps } from '@/node-modules/next/app';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HydrationBoundary } from '@tanstack/react-query';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </HydrationBoundary>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ConfigProvider>
  );
}
