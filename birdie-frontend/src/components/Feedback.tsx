import { FeedbackDataProps } from '../store/dataFeedback';
import { TagProp } from './Tag';

type FeedbackProps = FeedbackDataProps & {
  tags: TagProp[];
};

export default function Feedback({
  text,
  title,
  posted_at,
  id,
  tags,
}: FeedbackProps) {
  const originalDate = new Date(posted_at);
  const day = originalDate.getDate();
  const month = originalDate.toLocaleString('en-US', { month: 'long' });
  const year = originalDate.getFullYear();
  const formattedDate = `${day} ${month}, ${year}`;

  const highlightText = (text: string, tags: TagProp[]) => {
    let newText = text;
    tags.forEach((tag) => {
      const regex = new RegExp(tag.text, 'gi');
      newText = newText.replace(
        regex,
        `<span className="tag-in-text" style="background-color: ${tag.color};">${tag.text}</span>`
      );
    });
    return newText;
  };

  return (
    <div key={id} className="feedback">
      <p className="feedback-date">{formattedDate}</p>
      <h4 className="feedback-title">{title}</h4>
      <p
        className="feedback-text"
        dangerouslySetInnerHTML={{ __html: highlightText(text, tags) }}
      />
    </div>
  );
}
