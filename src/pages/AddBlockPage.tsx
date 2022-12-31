import { ChangeEventHandler, FormEventHandler } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { useBoundStore } from '@/hooks/useBoundStore';
import { BlockComponent } from '@/stores/blockSlice';

interface FormInputs {
  groupId: string;
  component: string;
  text: string;
  payload: string;
  topicToPub: string;
  topicToSub: string;
  max: string;
  min: string;
  onValue: string;
  offValue: string;
}

export function AddBlockPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const groupId = Number(searchParams.get('groupId'));
  const { blockGroups, addBlock } = useBoundStore(state => ({
    blockGroups: state.blockGroups,
    addBlock: state.addBlock,
  }));
  const onGroupChange: ChangeEventHandler<HTMLSelectElement> = event => {
    setSearchParams({ groupId: event.target.value });
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { groupId, ...block } = Object.fromEntries(
      formData
    ) as unknown as FormInputs;
    console.log(groupId, block);
    addBlock(Number(groupId), block);
    navigate('/home');
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white max-w-4xl mx-auto m-2 p-2 flex flex-col rounded-xl shadow-md border gap-2"
    >
      <h1>Add Block</h1>
      <label>
        Group:
        <Select defaultValue={groupId} onChange={onGroupChange} name="groupId">
          {blockGroups.map(group => (
            <option value={group.id} key={group.id}>
              {group.name}
            </option>
          ))}
        </Select>
      </label>
      <label>
        Block:
        <Select name="component">
          {Object.keys(BlockComponent).map(component => {
            return (
              <option key={component} value={component}>
                {component}
              </option>
            );
          })}
        </Select>
      </label>{' '}
      <label>
        label?
        <Input name="text" type="text" />
      </label>{' '}
      <label>
        payload?
        <Input name="payload" type="text" />
      </label>{' '}
      <label>
        pubTopic?
        <Input name="topicToPub" type="text" />
      </label>
      <label>
        subTopic?
        <Input name="topicToSub" type="text" />
      </label>
      <label>
        max?
        <Input name="max" type="number" />
      </label>
      <label>
        min?
        <Input name="min" type="number" />
      </label>
      <label>
        onValue?
        <Input name="onValue" type="text" />
      </label>
      <label>
        offValue?
        <Input name="offValue" type="text" />
      </label>
      <Button>Add Block</Button>
    </form>
  );
}
