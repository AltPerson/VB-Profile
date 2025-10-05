import Aside from '@/components/aside';
import BackgroundMusic from '@/components/background-music';
import CC_BY from '@/components/cc_by';
import Header from '@/components/header';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  return (
    <div className="w-full flex relative">
      <BackgroundMusic />
      <Aside />
      <CC_BY />
      <div className="flex-[0_1_50%] max-[992px]:flex-[0_0_100%] bg-black overflow-hidden">
        <div className="text-white bg-black central-text container-app">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
