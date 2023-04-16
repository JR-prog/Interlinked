import { Suspense } from 'react';

const feedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto text-white">
      <h1
        className="mb-3 text-left text-7xl font-extrabold"
        data-testid="title"
      >
        Your feed
      </h1>
      <Suspense>{children}</Suspense>
      <div className="h-32"></div>
    </div>
  );
};

export default feedLayout;