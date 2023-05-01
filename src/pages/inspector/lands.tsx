import {
  useContract,
  useContractRead,
  useContractWrite
} from '@thirdweb-dev/react';
import { FC, useMemo, useState } from 'react';
import { CONTRACT_ADDRESS } from '../../constant';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { BigNumber } from 'ethers';

export const InspectorsLandPage: FC = () => {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(contract, 'getAllLands');
  const {
    mutate,
    reset,
    isLoading: isVerifying
  } = useContractWrite(contract, 'verifyLand');
  const [verifyLand, setVerifyLand] = useState<BigNumber | null>(null);

  const lands = useMemo(() => {
    return (
      (
        data as Array<
          [BigNumber, BigNumber, string, string, BigNumber, string, boolean]
        >
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
      <div className={clsx('modal', { 'modal-open': !!verifyLand })}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Verify Land</h3>
          <p className="py-4">Are you sure you want to verify this Land?</p>
          <div className="modal-action">
            <button
              className="btn btn-error"
              onClick={() => setVerifyLand(null)}
            >
              Cancel
            </button>
            <button
              className={clsx('btn', { loading: isVerifying })}
              onClick={() => {
                mutate(
                  { args: [verifyLand?.toNumber()] },
                  {
                    onSuccess: () => {
                      toast.success('User verified successfully');
                      setVerifyLand(null);
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
        <h3 className="font-bold text-4xl">Lands</h3>
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
                        <td>
                          {l.isVerified ? (
                            <button
                              className="btn btn-sm btn-disabled"
                              disabled
                            >
                              Verified
                            </button>
                          ) : (
                            <button
                              className="btn btn-sm"
                              onClick={() => setVerifyLand(l.propertyId)}
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
