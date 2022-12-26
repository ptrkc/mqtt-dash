import { useBoundStore } from '@/hooks/useBoundStore';
import { ChangeEventHandler } from 'react';
import { useSearchParams } from 'react-router-dom';

export function AddBlockPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const groupId = Number(searchParams.get('groupId'));
  const onGroupChange: ChangeEventHandler<HTMLSelectElement> = event =>
    setSearchParams({ groupId: event.target.value });
  const { blockGroups } = useBoundStore(state => ({
    blockGroups: state.blockGroups,
  }));
  return (
    <div className="bg-white max-w-4xl mx-auto m-2 p-2 flex flex-col rounded-xl shadow-md border">
      <h1>Add Block</h1>
      <select defaultValue={groupId} onChange={onGroupChange}>
        {blockGroups.map(group => (
          <option value={group.id} key={group.id}>
            {group.name}
          </option>
        ))}
      </select>
      <span>select: group</span>
      <span>block type</span>
      <span>text</span>
      <span>pubTopic?</span>
      <span>subTopic?</span>
      <span>max?</span>
      <span>min?</span>
      <span>onValue?</span>
      <span>offValue?</span>
    </div>
  );
}
