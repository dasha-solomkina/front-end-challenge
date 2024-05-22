export type GraphDataProps = {
  date: string;
  count: number;
};

export default async function fetchGraphArray(): Promise<GraphDataProps[]> {
  try {
    const response = await fetch(
      'https://frontend-challenge.birdie.workers.dev/trendline',
      {
        mode: 'cors',
      }
    );

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
