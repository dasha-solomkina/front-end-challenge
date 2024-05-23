import { FeedbackDataProps } from '../store/dataFeedback';

export default function Feedback({
  text,
  title,
  posted_at,
}: FeedbackDataProps) {
  return (
    <div className="feedback">
      <p className="feedback-date">{posted_at}</p>
      <p className="feedback-title">{title}</p>
      <p className="feedback-text">{text}</p>
    </div>
  );
}
