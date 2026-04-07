export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--bg-deep)" }}
    >
      <div className="w-full max-w-md p-4">{children}</div>
    </div>
  );
}
