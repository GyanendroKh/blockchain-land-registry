import {
  useContract,
  useContractRead,
  useContractWrite
} from '@thirdweb-dev/react';
import { FC, useState } from 'react';
import { CONTRACT_ADDRESS } from '../../constant';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const OwnerInspectorsPage: FC = () => {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(contract, 'getAllInspectors');
  const { mutate, isLoading: isAdding } = useContractWrite(
    contract,
    'addInspector'
  );
  const [showAddInspector, setShowInspector] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      _addr: '',
      _name: ''
    }
  });

  const inspectors: Array<[string, string]> = data ?? [];

  return (
    <div>
      <div className={`modal ${showAddInspector ? 'modal-open' : ''}`}>
        <form
          className="modal-box"
          onSubmit={handleSubmit(d => {
            mutate(
              { args: [d._addr, d._name] },
              {
                onSuccess: () => {
                  toast('Inspector added successfully');
                  reset();
                  setShowInspector(false);
                },
                onError: (e: any) => {
                  toast.error(e.reason || "Can't add");
                }
              }
            );
          })}
        >
          <h3 className="font-bold text-lg">Add Inspector</h3>
          <div className="py-4 flex flex-col gap-2">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Wallet Address</span>
              </label>
              <input
                type="text"
                placeholder="Address"
                className="input input-bordered w-full"
                {...register('_addr')}
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
          </div>

          <div className="modal-action">
            <button
              className="btn btn-error"
              onClick={() => {
                setShowInspector(false);
              }}
            >
              Cancel
            </button>
            <button
              className={clsx('btn', { loading: isAdding })}
              type="submit"
              disabled={isAdding}
            >
              Add
            </button>
          </div>
        </form>
      </div>

      <div className="flex p-4 items-center justify-between">
        <h3 className="font-bold text-4xl">Inspectors</h3>
        <button
          className="btn btn-primary"
          onClick={() => setShowInspector(true)}
        >
          Add Inspector
        </button>
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
                  </tr>
                </thead>
                <tbody>
                  {inspectors.map(([addr, name], idx) => {
                    return (
                      <tr key={addr}>
                        <th>{idx + 1}</th>
                        <td>{addr}</td>
                        <td>{name}</td>
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
