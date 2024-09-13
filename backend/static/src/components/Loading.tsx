export default function Loading({ loading }: { loading: boolean }) {
  if (!loading) return null;
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        position: "absolute",
        inset: 0,
      }}
    >
      <p>Loading...</p>
    </div>
  );
}
