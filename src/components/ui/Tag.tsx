function Tag({
  clickCallback,
  name,
  selected = false,
}: {
  clickCallback: () => void;
  name: string;
  selected: boolean;
}) {
  return (
    <div
      className="w-max pt-2 pb-2 pl-4 pr-4 rounded-lg text-(--static-white-main) cursor-pointer active:scale-[0.95] transition-all"
      style={{
        background: selected ? "var(--secd-color)" : "var(--tint-color)",
      }}
      onClick={clickCallback}
    >
      <p className="text-[0.8rem]"> {name}</p>
    </div>
  );
}

export default Tag;
