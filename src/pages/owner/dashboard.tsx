import { useContract, useContractRead } from '@thirdweb-dev/react';
import { FC } from 'react';
import { CONTRACT_ADDRESS } from '../../constant';
import { BigNumber } from 'ethers';

export const OwnerDashboardPage: FC = () => {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: inspectorCountRes } = useContractRead(
    contract,
    'getInspectorCount'
  );
  const { data: usersCountRes } = useContractRead(contract, 'getUserCount');
  const { data: landCountRes } = useContractRead(contract, 'getLandCount');

  const [inspectorCount, userCount, landCount] = [
    inspectorCountRes,
    usersCountRes,
    landCountRes
  ].map(res => (res ? (res as BigNumber).toNumber() : 0));

  return (
    <div className="p-5 flex flex-1 flex-col">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">{userCount}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Inspector Count</div>
          <div className="stat-value text-secondary">{inspectorCount}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Land Count</div>
          <div className="stat-value">{landCount}</div>
        </div>
      </div>
    </div>
  );
};
