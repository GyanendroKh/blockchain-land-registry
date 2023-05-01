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

export const InspectorDashboardPage: FC = () => {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data, isLoading: isInspectorLoading } = useContractRead(
    contract,
    'getInspector',
    [address]
  );
  const { isLoading: isUpdating, mutate } = useContractWrite(
    contract,
    'updateInspector'
  );

  const inspector = useMemo(() => {
    return data
      ? {
          addr: data[0] as string,
          name: data[1] as string
        }
      : null;
  }, [data]);

  const { handleSubmit, reset, register } = useForm({
    defaultValues: {
      _name: ''
    }
  });

  useEffect(() => {
    if (inspector) {
      reset({
        _name: inspector.name
      });
    }
  }, [inspector]);

  if (isInspectorLoading) {
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
            { args: [d._name] },
            {
              onSuccess: () => {
                toast('Inspector updated successfully');
                reset();
              },
              onError: (e: any) => {
                toast.error(e.reason || "Can't update Inspector");
              }
            }
          );
        })}
      >
        <h3 className="font-bold text-lg">Inspector Details</h3>
        <div className="py-4 flex flex-col gap-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Wallet Address</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              value={inspector?.addr || ''}
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
