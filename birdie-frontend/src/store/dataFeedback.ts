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

export default async function fetchFeedbackList(
  url: string
): Promise<FeedbackListProps> {
  try {
    const response = await fetch(url, {
      mode: 'cors',
    });

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
