import { BlockGroup } from '@/stores/blockSlice';
import { BlockContainer } from './BlockContainer';

export function BlockGroupContainer({ group }: { group: BlockGroup }) {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md border w-full max-w-sm overflow-hidden">
      <h2 className="bg-gray-100 px-2 py-1">{group.name}</h2>
      <div className="p-1 pb-2">
        {group.blocks.map(block => {
          return <BlockContainer key={block.id} block={block} />;
        })}
      </div>
    </div>
  );
}
