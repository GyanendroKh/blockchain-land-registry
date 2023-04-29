import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { FC } from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App: FC = () => {
  return (
    <ThirdwebProvider activeChain="mumbai">
      <ToastContainer />
      <RouterProvider router={router} />
    </ThirdwebProvider>
  );
};
