import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { useBoundStore } from '@/hooks/useBoundStore';
import { BlockComponent, BlockComponentOptions } from '@/stores/blockSlice';
import { cn } from '@/utils/classnames';

interface FormInputs {
  text: string;
  payload: string;
  topicToPub: string;
  topicToSub: string;
  max: string;
  min: string;
  onValue: string;
  offValue: string;
}

// const BlockFormOptions = {
// logger: {
//   selects: {
//     types: ['topic','message','connection','error'],
//   }
// },
//   button: ['topicToPub', 'text', 'payload'],
//   range: ['name', 'topicToSub', 'topicToPub', 'min', 'max'],
//   switch: ['name', 'topicToSub', 'topicToPub'],
// };

function FirstStepSelectBlock({
  blockComponent,
  nextStep,
  searchParams,
  setSearchParams,
}: {
  nextStep: () => void;
  blockComponent: BlockComponent;
  searchParams: URLSearchParams;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
}) {
  const { blockGroups } = useBoundStore(state => ({
    blockGroups: state.blockGroups,
  }));
  const [selectedBlock, setSelectedBlock] =
    useState<BlockComponent>(blockComponent);
  const [groupId, setGroupId] = useState(searchParams.get('groupId') ?? '');
  const onBlockSelect: ChangeEventHandler<HTMLInputElement> = event => {
    const value = event.target.value;
    setSelectedBlock(value as BlockComponent);
  };

  const onClick = () => {
    setSearchParams({ groupId, block: selectedBlock });
    nextStep();
  };

  return (
    <div className="bg-white max-w-4xl mx-auto m-2 p-2 flex flex-col rounded-xl shadow-md border gap-2">
      <h1>Choose a group and block</h1>
      <label className="flex gap-2">
        Group:
        <Select
          defaultValue={groupId}
          onChange={e => setGroupId(e.target.value)}
          name="groupId"
        >
          {blockGroups.map(group => (
            <option value={group.id} key={group.id}>
              {group.name}
            </option>
          ))}
        </Select>
      </label>
      <div className="flex flex-wrap gap-4">
        {BlockComponentOptions.map(block => {
          const selected = selectedBlock === block;
          return (
            <label
              key={block}
              className={cn(
                'p-4 border-2',
                selected && ' ring-4 ring-indigo-500'
              )}
            >
              <input
                type="radio"
                name="component"
                value={block}
                onChange={onBlockSelect}
                checked={selected}
                className="hidden"
              />
              {block}
            </label>
          );
        })}
      </div>
      <Button onClick={onClick}>Next</Button>
    </div>
  );
}

function SecondStepBlockParams({
  blockComponent,
  onSubmit,
}: {
  blockComponent: BlockComponent;
  onSubmit: FormEventHandler<HTMLFormElement>;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white max-w-4xl mx-auto m-2 p-2 flex flex-col rounded-xl shadow-md border gap-2"
    >
      <h1>Add Block</h1>
      {blockComponent !== 'image' && (
        <label className="flex gap-2">
          Label:
          <Input name="text" type="text" />
        </label>
      )}
      {(blockComponent === 'image' || blockComponent === 'button') && (
        <label className="flex gap-2">
          Payload to publish:
          <Input name="payload" type="text" />
        </label>
      )}
      <label className="flex gap-2">
        Topic to publish on:
        <Input name="topicToPub" type="text" />
      </label>
      {blockComponent !== 'button' && (
        <label className="flex gap-2">
          Topic to subscribe to:
          <Input name="topicToSub" type="text" />
        </label>
      )}
      {blockComponent === 'range' && (
        <>
          <label className="flex gap-2">
            Minimum value (default is 0):
            <Input placeholder="0" name="min" type="number" />
          </label>
          <label className="flex gap-2">
            Maximum value (default is 100):
            <Input placeholder="100" name="max" type="number" />
          </label>
        </>
      )}
      {blockComponent === 'switch' && (
        <>
          <label className="flex gap-2">
            ON payload:
            <Input name="onValue" type="text" />
          </label>
          <label className="flex gap-2">
            OFF payload:
            <Input name="offValue" type="text" />
          </label>
        </>
      )}
      <Button>Add Block</Button>
    </form>
  );
}

export function AddBlockPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const searchBlock = searchParams.get('block');
  const blockComponent =
    searchBlock && BlockComponentOptions.includes(searchBlock)
      ? (searchBlock as BlockComponent)
      : 'button';

  const navigate = useNavigate();
  const { addBlock } = useBoundStore(state => ({
    addBlock: state.addBlock,
  }));

  const onSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const groupId = searchParams.get('groupId');
    const block = Object.fromEntries(formData) as unknown as FormInputs;
    console.log(groupId, block);
    addBlock(Number(groupId), { ...block, component: blockComponent });
    navigate('/home');
  };

  if (
    step === 1 ||
    !BlockComponentOptions.includes(searchBlock as BlockComponent)
  )
    return (
      <FirstStepSelectBlock
        blockComponent={blockComponent}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        nextStep={() => setStep(2)}
      />
    );

  return (
    <SecondStepBlockParams
      blockComponent={blockComponent}
      onSubmit={onSubmit}
    />
  );
}
