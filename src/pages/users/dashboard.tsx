import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite
} from '@thirdweb-dev/react';
import clsx from 'clsx';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CONTRACT_ADDRESS } from '../../constant';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const UserDashboardPage: FC = () => {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data, isLoading: isUserLoading } = useContractRead(
    contract,
    'getUser',
    [address]
  );
  const { isLoading: isUpdating, mutate } = useContractWrite(
    contract,
    'updateUser'
  );

  const user = useMemo(() => {
    return data
      ? {
          addr: data[0] as string,
          name: data[1] as string,
          aadharNumber: data[2] as string,
          verified: data[3] as boolean
        }
      : null;
  }, [data]);

  const { handleSubmit, reset, register } = useForm({
    defaultValues: {
      _name: '',
      _aadharNumber: ''
    }
  });

  useEffect(() => {
    if (user) {
      reset({
        _name: user.name,
        _aadharNumber: user.aadharNumber
      });
    }
  }, [user]);

  if (isUserLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <form
        className="modal-box"
        onSubmit={handleSubmit(d => {
          mutate(
            { args: [d._name, d._aadharNumber] },
            {
              onSuccess: () => {
                toast('User updated successfully');
                reset();
              },
              onError: (e: any) => {
                toast.error(e.reason || "Can't update User");
              }
            }
          );
        })}
      >
        <h3 className="font-bold text-lg">User Details</h3>
        <div className="py-4 flex flex-col gap-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Wallet Address</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              value={user?.addr || ''}
              disabled
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              {...register('_name')}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Aadhar Number</span>
            </label>
            <input
              type="text"
              placeholder="Aadhar Number"
              className="input input-bordered w-full"
              {...register('_aadharNumber')}
            />
          </div>

          <div className="form-control w-full">
            <label className="label cursor-pointer">
              <span className="label-text">Verified</span>
              <input
                type="checkbox"
                checked={user?.verified ?? false}
                className="checkbox"
                disabled
              />
            </label>
          </div>
        </div>

        <div className="modal-action">
          <button
            className={clsx('btn', { loading: isUpdating })}
            type="submit"
            disabled={isUpdating}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
