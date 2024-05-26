import Feedback from './Feedback';
import { FeedbackDataProps } from '../store/dataFeedback.ts';
import { TagProp } from './Tag';

type FeedbackListProps = {
  fetchedFeedbackArray: FeedbackDataProps[];
  tags: TagProp[];
};

export default function FeedbackList({
  fetchedFeedbackArray,
  tags,
}: FeedbackListProps) {
  return (
    <div className="feedback-list">
      {fetchedFeedbackArray.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} tags={tags} />
      ))}
    </div>
  );
}
