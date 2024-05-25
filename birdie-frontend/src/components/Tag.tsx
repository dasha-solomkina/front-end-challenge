export type TagProps = {
  text: string;
  color: string;
  id: string | number;
};

export default function Tag({ text, color, id }: TagProps) {
  return (
    <div key={id} className="tag" style={{ backgroundColor: color }}>
      <p>{text}</p>
      <button className="delete-tag-btn">x</button>
    </div>
  );
}
