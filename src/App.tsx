import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { FC } from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';

export const App: FC = () => {
  return (
    <ThirdwebProvider activeChain="ethereum">
      <RouterProvider router={router} />
    </ThirdwebProvider>
  );
};
