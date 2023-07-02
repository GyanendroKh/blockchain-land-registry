import {
  ConnectWallet,
  useContract,
  useContractRead
} from '@thirdweb-dev/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CONTRACT_ADDRESS } from '../constant';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ILand } from '../types';

export const HomePage: FC = () => {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(contract, 'getAllLands');
  const navItems = (
    <>
      <li>
        <a>Home</a>
      </li>
      <li>
        <a>User</a>
      </li>
      <li>
        <a>Inspector</a>
      </li>
      <li>
        <a>About Us</a>
      </li>
      <li>
        <ConnectWallet btnTitle="Log In" className="!ml-1" />
      </li>
    </>
  );

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Land Registry</a>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
      </div>
      <div
        className="hero min-h-[70vh]"
        style={{
          backgroundImage: `url("/pexels-josh-sorenson-59515.jpg")`
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Land Registry</h1>
            <p className="mb-5">
              Land Registry is a blockchain based application that allows users
              to register their land and get a certificate of ownership.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full my-10">
        <ConnectWallet btnTitle="Log In to get started" />
      </div>
      <div className="flex flex-col flex-1">
        {isLoading ? (
          <div className="flex-1 grid place-items-center">
            <LoadingSpinner />
          </div>
        ) : data?.length === 0 ? (
          <></>
        ) : (
          <div className="p-4">
            <h2 className="pb-2 text-3xl font-bold">Available Lands</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Property ID</th>
                    <th>Area (in sqft)</th>
                    <th>Address</th>
                    <th>Lat Lng</th>
                  </tr>
                </thead>
                <tbody>
                  {(data as Array<ILand>)
                    ?.filter(l => l.isVerified)
                    ?.map(l => {
                      return (
                        <tr key={l.id.toString()}>
                          <th>{l.id.toString()}</th>
                          <td>{l.propertyId.toString()}</td>
                          <td>{l.area.toString()}</td>
                          <td>{l.landAddress}</td>
                          <td>{l.latLng}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center gap-4 w-[75%] my-10 mx-auto">
        <div className="card bg-base-100 shadow-2xl flex-1">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Owner</h2>
            <div className="card-actions">
              <Link className="btn btn-square btn-outline" to="/o">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                >
                  <path
                    d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z"
                    stroke="currentColor"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="card bg-base-200 shadow-2xl flex-1">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Land Inspector</h2>
            <div className="card-actions">
              <Link className="btn btn-square btn-outline" to="/i">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                >
                  <path
                    d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z"
                    stroke="currentColor"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-2xl flex-1">
          <div className="card-body items-center text-center">
            <h2 className="card-title">User</h2>
            <div className="card-actions">
              <Link className="btn btn-square btn-outline" to="/u">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                >
                  <path
                    d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z"
                    stroke="currentColor"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer footer-center p-10 py-12 bg-base-200 text-base-content rounded">
        <div className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
        </div>
        <div>
          <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
        </div>
      </footer>
    </>
  );
};
