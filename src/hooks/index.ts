import useSWR from "swr";

export function useNowPlaying() {
  const { data, error } = useSWR(
    `/api/now-playing`,
    async (url) => {
      const response = await fetch(url);
      return response.json();
    },
    {
      refreshInterval: 15 * 1000,
    }
  );

  return {
    nowPlaying: data,
    error,
  };
}
