import { get } from '../api';

export type FeedbackDataProps = {
  text: string;
  title: string;
  posted_at: string;
  id: string;
};

export type FeedbackListProps = {
  data: FeedbackDataProps[];
  count: number;
  nextPage: number | null;
  previousPage: number | null;
};

export type FetchFeedbackListParams = {
  page: number;
  pageSize: number;
  search: string;
};

export default async function fetchFeedbackList(
  params: FetchFeedbackListParams
): Promise<FeedbackListProps> {
  try {
    const qs = new URLSearchParams({
      ...params,
      page: params.page.toString(),
      pageSize: params.pageSize.toString(),
    }).toString();
    const url = 'feedback?' + qs;
    const response = await get(url);

    if (!response.ok) {
      throw new Error(
        `Unexpected error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
