import {
  useContract,
  useContractRead,
  useContractWrite
} from '@thirdweb-dev/react';
import { FC, useState } from 'react';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { CONTRACT_ADDRESS } from '../../constant';
import clsx from 'clsx';
import { toast } from 'react-toastify';

export const InspectorUsersPage: FC = () => {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(contract, 'getAllUsers');
  const {
    mutate,
    reset,
    isLoading: isVerifying
  } = useContractWrite(contract, 'verifyUser');

  const [verifyUser, setVerifyUser] = useState<string | null>(null);

  const users: Array<[string, string, string, boolean]> = data ?? [];

  return (
    <div>
      <div className={clsx('modal', { 'modal-open': !!verifyUser })}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Verify User</h3>
          <p className="py-4">Are you sure you want to verify this user?</p>
          <div className="modal-action">
            <button
              className="btn btn-error"
              onClick={() => setVerifyUser(null)}
            >
              Cancel
            </button>
            <button
              className={clsx('btn', { loading: isVerifying })}
              onClick={() => {
                mutate(
                  { args: [verifyUser] },
                  {
                    onSuccess: () => {
                      toast.success('User verified successfully');
                      setVerifyUser(null);
                      reset();
                    },
                    onError: (e: any) => {
                      toast.error(e.reason ?? 'Error verifying user');
                    }
                  }
                );
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
      <div className="flex p-4 items-center justify-between">
        <h3 className="font-bold text-4xl">Users</h3>
      </div>

      <div className="flex flex-col flex-1">
        {isLoading ? (
          <div className="flex-1 grid place-items-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Address</th>
                    <th>Name</th>
                    <th>Aadhar Number</th>
                    <th>Is Verified</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(([addr, name, aadharNumber, isVerified], idx) => {
                    return (
                      <tr key={addr}>
                        <th>{idx + 1}</th>
                        <td>{addr}</td>
                        <td>{name}</td>
                        <td>{aadharNumber}</td>
                        <td>{isVerified ? 'Verified' : 'Not Verified'}</td>
                        <td>
                          {isVerified ? (
                            <button
                              className="btn btn-sm btn-disabled"
                              disabled
                            >
                              Already Verified
                            </button>
                          ) : (
                            <button
                              className="btn btn-info btn-sm"
                              onClick={() => setVerifyUser(addr)}
                            >
                              Verify
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
