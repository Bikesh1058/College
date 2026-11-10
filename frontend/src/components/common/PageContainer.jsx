export default function PageContainer({ className = "", children }) {
  return (
    <div className={`mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
