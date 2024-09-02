import { ReactNode } from 'react';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="max-[992px]:central-text max-[992px]:p-[2px] content-part">
      <div className="max-[992px]:central-bg-mobile-0 h-full flex flex-col gap-9 max-[425px]:gap-3 pb-4 pt-[10%] max-[992px]:pt-[5%] max-md:gap-4">
        {children}
      </div>
    </main>
  );
};

export default DefaultLayout;
