import { useBoundStore, BoundState } from '@/hooks/useBoundStore';
import * as Dialog from '@radix-ui/react-dialog';
import { FormEvent, useState } from 'react';
import { Button } from './Button';
import { PlusIcon } from './Icons';
import { Input } from './Input';

const selector = (state: BoundState) => state.addGroup;

export function AddGroupButtonModal() {
  const [open, setOpen] = useState(false);
  const addGroup = useBoundStore(selector);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const groupName = formData.get('groupName') as string;
    addGroup(groupName ? groupName : 'Group');
    setOpen(false);
  };
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button icon={<PlusIcon />}>Add Group</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed top-0 bottom-0 right-0 left-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-lg flex flex-col gap-4">
          <form onSubmit={onSubmit} className="flex flex-col gap-4 p-1">
            <Dialog.Title>What&apos;s the name of the group?</Dialog.Title>
            <Dialog.Description>
              <Input placeholder="Group" name="groupName" className="w-full" />
            </Dialog.Description>
            <div className="flex justify-end gap-4">
              <Dialog.Close asChild>
                <Button type="button">Cancel</Button>
              </Dialog.Close>
              <Button type="submit">Add Group</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
