const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto min-h-screen max-w-[1440px]">{children}</div>;
};

export default PageContainer;
