import { FeedbackDataProps } from '../store/dataFeedback';

export default function Feedback({
  text,
  title,
  posted_at,
  id,
}: FeedbackDataProps) {
  const originalDate = new Date(posted_at);
  const day = originalDate.getDate();
  const month = originalDate.toLocaleString('en-US', { month: 'long' });
  const year = originalDate.getFullYear();
  const formattedDate = `${day} ${month}, ${year}`;

  return (
    <div key={id} className="feedback">
      <p className="feedback-date">{formattedDate}</p>
      <h4 className="feedback-title">{title}</h4>
      <p className="feedback-text">{text}</p>
    </div>
  );
}
