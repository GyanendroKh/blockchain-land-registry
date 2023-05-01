import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite
} from '@thirdweb-dev/react';
import { FC, useMemo, useState } from 'react';
import { CONTRACT_ADDRESS } from '../../constant';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const UsersLandPage: FC = () => {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(contract, 'getAllLands', [
    address
  ]);
  const { mutate, isLoading: isAdding } = useContractWrite(contract, 'addLand');
  const [showAddLand, setShowLand] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      _area: '',
      _landAddress: '',
      _latLng: '',
      _propertyId: ''
    }
  });

  const lands = useMemo(() => {
    return (
      (
        data as Array<[BigInt, BigInt, string, string, BigInt, string, boolean]>
      )?.map(
        ([
          _id,
          _area,
          _landAddress,
          _latLng,
          _propertyId,
          _ownerAddr,
          _isVerified
        ]) => {
          return {
            id: _id,
            area: _area,
            landAddress: _landAddress,
            latLng: _latLng,
            propertyId: _propertyId,
            ownerAddr: _ownerAddr,
            isVerified: _isVerified
          };
        }
      ) ?? []
    );
  }, [data]);

  return (
    <div>
      <div className={`modal ${showAddLand ? 'modal-open' : ''}`}>
        <form
          className="modal-box"
          onSubmit={handleSubmit(d => {
            mutate(
              {
                args: [
                  BigInt(d._area),
                  d._landAddress,
                  d._latLng,
                  BigInt(d._propertyId)
                ]
              },
              {
                onSuccess: () => {
                  toast('Inspector added successfully');
                  reset();
                  setShowLand(false);
                },
                onError: (e: any) => {
                  toast.error(e.reason || "Can't add");
                }
              }
            );
          })}
          onReset={() => {
            setShowLand(false);
            reset();
          }}
        >
          <h3 className="font-bold text-lg">Add Land</h3>
          <div className="py-4 flex flex-col gap-2">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Area in sqft</span>
              </label>
              <input
                type="number"
                placeholder="Area"
                className="input input-bordered w-full"
                {...register('_area')}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                placeholder="Address"
                className="input input-bordered w-full"
                {...register('_landAddress')}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Lat Lng</span>
              </label>
              <input
                type="text"
                placeholder="Lat Lng"
                className="input input-bordered w-full"
                {...register('_latLng')}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Property ID</span>
              </label>
              <input
                type="text"
                placeholder="Property ID"
                className="input input-bordered w-full"
                {...register('_propertyId')}
              />
            </div>
          </div>

          <div className="modal-action">
            <button type="reset" className="btn btn-error">
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
        <h3 className="font-bold text-4xl">Lands</h3>
        <button className="btn btn-primary" onClick={() => setShowLand(true)}>
          Add Land
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
                    <th>ID</th>
                    <th>Property ID</th>
                    <th>Area (in sqft)</th>
                    <th>Address</th>
                    <th>Lat Lng</th>
                    <th>Owner Address</th>
                    <th>Is Verified</th>
                  </tr>
                </thead>
                <tbody>
                  {lands.map(l => {
                    return (
                      <tr key={l.id.toString()}>
                        <th>{l.id.toString()}</th>
                        <td>{l.propertyId.toString()}</td>
                        <td>{l.area.toString()}</td>
                        <td>{l.landAddress}</td>
                        <td>{l.latLng}</td>
                        <td>{l.ownerAddr}</td>
                        <td>{l.isVerified ? 'Verified' : 'Not Verified'}</td>
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
