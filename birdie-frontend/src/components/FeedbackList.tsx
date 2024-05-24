import Feedback from './Feedback';
import { FeedbackDataProps } from '../store/dataFeedback.ts';

export type FeedbackListProps = {
  fetchedFeedbackArray: FeedbackDataProps[];
};

export default function FeedbackList({
  fetchedFeedbackArray,
}: FeedbackListProps) {
  return (
    <div className="feedback-list">
      {fetchedFeedbackArray.map((feedback) => {
        return (
          <Feedback
            key={feedback.id}
            id={feedback.id}
            posted_at={feedback.posted_at}
            title={feedback.title}
            text={feedback.text}
          />
        );
      })}
    </div>
  );
}
