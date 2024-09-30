/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Loading({ type, size, w, h }: any) {
  return (
    <span
      className={`loading loading-${type} loading-${size} ${w} ${h}`}
    ></span>
  );
}
