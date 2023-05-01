import {
  useAddress,
  useConnectionStatus,
  useContract,
  useContractRead
} from '@thirdweb-dev/react';
import { FC } from 'react';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CONTRACT_ADDRESS } from '../../constant';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const OwnerPage: FC = () => {
  const connectionStatus = useConnectionStatus();
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data, isLoading: isOwerLoading } = useContractRead(
    contract,
    'isContractOwner',
    [address]
  );

  if (connectionStatus === 'connecting' || isOwerLoading) {
    return (
      <div className="grid place-items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!address) {
    toast('Please connect your wallet and try again.', { type: 'warning' });
    return <Navigate to="/" />;
  }

  if (!data) {
    toast('You are not the Owner.', { type: 'warning' });
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="owner-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="p-1">
            <label htmlFor="owner-drawer" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          </div>

          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="owner-drawer"
            className="drawer-overlay !opacity-40"
          ></label>

          <ul className="menu p-4 w-80 text-base-content bg-base-300 gap-1">
            <div className="h-[150px] grid place-items-center">
              Contract Owner
            </div>
            <li>
              <NavLink to="." end>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="inspectors" end>
                Land Inspector
              </NavLink>
            </li>
            <li>
              <NavLink to="/">Back to Site</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
