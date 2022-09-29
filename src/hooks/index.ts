import useSWR from "swr";
import type { INowPlaying } from "../lib/types";

export function useNowPlaying() {
  const { data, error } = useSWR<INowPlaying | null>(
    `/api/now-playing`,
    async (url) => {
      const response = await fetch(url);
      const json = await response.json();
      return json.item;
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
