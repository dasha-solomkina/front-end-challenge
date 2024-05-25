import Tag, { TagProps } from './Tag';

export type TagsListProps = {
  tagsArray: TagProps[];
};

export default function TagsList({ tagsArray }: TagsListProps) {
  return (
    <div className="tags-list">
      {tagsArray.map((tag) => {
        return (
          <Tag key={tag.id} id={tag.id} text={tag.text} color={tag.color} />
        );
      })}
    </div>
  );
}
