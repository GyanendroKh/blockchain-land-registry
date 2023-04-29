import { useAddress, useDisconnect } from '@thirdweb-dev/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const HomePage: FC = () => {
  const address = useAddress();
  const disconnect = useDisconnect();

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
      {!!address && (
        <li>
          <a onClick={disconnect}>LogOut</a>
        </li>
      )}
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
      <div className="flex justify-center gap-4 w-[75%] my-10 mx-auto">
        <div className="card bg-base-100 shadow-2xl flex-1">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Owner</h2>
            <div className="card-actions">
              <Link className="btn btn-primary" to="/login?role=owner">
                LogIn
              </Link>
            </div>
          </div>
        </div>
        <div className="card bg-slate-800 shadow-2xl flex-1">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Land Inspector</h2>
            <div className="card-actions">
              <Link className="btn btn-primary" to="/login?role=inspector">
                LogIn
              </Link>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-2xl flex-1">
          <div className="card-body items-center text-center">
            <h2 className="card-title">User</h2>
            <div className="card-actions">
              <Link className="btn btn-primary" to="/login?role=user">
                LogIn
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
