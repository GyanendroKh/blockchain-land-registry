import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite
} from '@thirdweb-dev/react';
import clsx from 'clsx';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CONTRACT_ADDRESS } from '../../constant';
import { Link, Navigate } from 'react-router-dom';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const UserRegister: FC = () => {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: isUserExist, isLoading: isUserLoading } = useContractRead(
    contract,
    'isUserExist',
    [address]
  );
  const { isLoading: isAdding, mutate } = useContractWrite(contract, 'addUser');

  const { handleSubmit, reset, register } = useForm({
    defaultValues: {
      _name: '',
      _aadharNumber: ''
    }
  });

  if (isUserLoading) {
    return (
      <div className="grid place-items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isUserExist) {
    return <Navigate to=".." relative="path" />;
  }

  return (
    <div className="flex min-h-screen justify-center items-center">
      <form
        className="modal-box"
        onSubmit={handleSubmit(d => {
          mutate(
            { args: [d._name, d._aadharNumber] },
            {
              onSuccess: () => {
                toast('User added successfully');
                reset();
              },
              onError: (e: any) => {
                toast.error(e.reason || "Can't add User");
              }
            }
          );
        })}
      >
        <h3 className="font-bold text-lg">Register</h3>
        <div className="py-4 flex flex-col gap-2">
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
        </div>

        <div className="modal-action">
          <Link to="/" className="btn btn-error">
            Cancel
          </Link>
          <button
            className={clsx('btn', { loading: isAdding })}
            type="submit"
            disabled={isAdding}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
