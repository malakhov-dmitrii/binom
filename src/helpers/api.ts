export const baseUrl = 'https://api.slingacademy.com/v1/sample-data/blog-posts';

export async function fetchPosts(offset: number, limit: number) {
  const res = await fetch(
    `${baseUrl}?offset=${offset * limit - limit}&limit=${limit}`
  );
  return res.json();
}

export async function fetchPost(id: number) {
  const res = await fetch(`${baseUrl}/${id}`);
  return res.json();
}
