import Tag, { TagProp } from './Tag';

export type TagsListProps = {
  tagsArray: TagProp[];
  handleDeleteTag: (id: string) => void;
  handleSearchByTag: (text: string, id: string) => void;
  activeSearchTag: string;
};

export default function TagsList({
  tagsArray,
  handleDeleteTag,
  handleSearchByTag,
  activeSearchTag,
}: TagsListProps) {
  return (
    <div className="tags-list">
      {tagsArray.map((tag) => {
        return (
          <Tag
            activeSearchTag={activeSearchTag}
            handleSearchByTag={handleSearchByTag}
            handleDeleteTag={handleDeleteTag}
            key={tag.id}
            id={tag.id}
            text={tag.text}
            color={tag.color}
          />
        );
      })}
    </div>
  );
}
