function Progress({ percent }: { percent: number }) {
  return (
    <div className="w-full h-3 rounded-lg bg-(--main-color) overflow-hidden relative">
      <div
        className="w-0 h-3 absolute left-0 bg-(--secd-color)"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}

export default Progress;
