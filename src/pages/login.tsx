import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import { FC } from 'react';
import { Navigate } from 'react-router-dom';

export const LogInPage: FC = () => {
  const address = useAddress();

  if (address) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <ConnectWallet />
    </>
  );
};
