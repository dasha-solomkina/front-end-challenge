import Feedback from './Feedback';
import { useEffect, useState } from 'react';
import fetchFeedbackList, { FeedbackListProps } from '../store/dataFeedback';

export default function FeedbackList() {
  const [fetchedFeedback, setFetchedFeedback] =
    useState<FeedbackListProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFeedbackList();
        setFetchedFeedback(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      //   finally {
      //     setLoading(false);
      //   }
    };
    fetchData();
  }, []);

  return (
    <div className="feedback-list">
      {fetchedFeedback
        ? fetchedFeedback.data.map((feedback) => {
            return (
              <Feedback
                key={feedback.posted_at}
                posted_at={feedback.posted_at}
                title={feedback.title}
                text={feedback.text}
              />
            );
          })
        : 'ops'}
    </div>
  );
}
