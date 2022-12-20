import { BoundState, useBoundStore } from '@/hooks/useBoundStore';
import { BlockGroupContainer } from '@/components/BlockGroupContainer';

const blockGroupsSelector = (state: BoundState) => state.blockGroups;

export function Board() {
  const blockGroups = useBoundStore(blockGroupsSelector);

  return (
    <div className="flex justify-center flex-wrap gap-2">
      {blockGroups.map(group => {
        return <BlockGroupContainer key={group.id} group={group} />;
      })}
    </div>
  );
}
