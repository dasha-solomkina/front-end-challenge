type AddTagBtnProps = {
  buttonVisible: boolean;
  buttonPosition: {
    top: number;
    left: number;
  };
  handleAddTag: () => void;
};

export default function AddTagBtn({
  buttonVisible,
  buttonPosition,
  handleAddTag,
}: AddTagBtnProps) {
  return (
    buttonVisible && (
      <div
        className="highlight-button-container"
        style={{
          top: `${buttonPosition.top}px`,
          left: `${buttonPosition.left}px`,
        }}
      >
        <button onClick={handleAddTag} id="highlight-button">
          Add Tag
        </button>
      </div>
    )
  );
}
