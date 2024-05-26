export type TagProps = {
  text: string;
  color: string;
  id: string;
  handleDeleteTag: (id: string) => void;
  handleSearchByTag: (text: string, id: string) => void;
};

export type TagProp = {
  text: string;
  color: string;
  id: string;
};

export default function Tag({
  text,
  color,
  id,
  handleDeleteTag,
  handleSearchByTag,
}: TagProps) {
  return (
    <div key={id} className="tag" style={{ backgroundColor: color }}>
      <p onClick={() => handleSearchByTag(text, id)}>{text}</p>
      <button onClick={() => handleDeleteTag(id)} className="delete-tag-btn">
        x
      </button>
    </div>
  );
}
