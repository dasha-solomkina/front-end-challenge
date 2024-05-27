import { get } from '../api';

export type GraphDataProps = {
  date: string;
  count: number;
};

export default async function fetchGraphArray(): Promise<GraphDataProps[]> {
  try {
    const response = await get('trendline');

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
