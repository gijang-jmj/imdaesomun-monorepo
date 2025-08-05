interface NoticeBannerProps {
  title: string;
  children?: React.ReactNode;
}

export const NoticeBanner = ({ title, children }: NoticeBannerProps) => {
  return (
    <div className="flex items-center gap-2">
      {children}
      <span className="text-subtitle-bold md:text-title-bold">{title}</span>
    </div>
  );
};
