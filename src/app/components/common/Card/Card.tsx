const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-[21px] border border-white border-opacity-10 bg-customBlack p-3">
      {children}
    </div>
  );
};

export default Card;