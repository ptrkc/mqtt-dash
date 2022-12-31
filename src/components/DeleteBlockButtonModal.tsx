import { EditorButton } from '@/components/EditorButton';
import { TrashIcon } from '@/components/Icons';
import { useBoundStore, BoundState } from '@/hooks/useBoundStore';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button } from './Button';

const selector = (state: BoundState) => state.deleteBlock;

export function DeleteBlockButtonModal({ blockId }: { blockId: number }) {
  const deleteBlock = useBoundStore(selector);
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <EditorButton icon={<TrashIcon />} />
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black/50 fixed top-0 bottom-0 right-0 left-0" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-lg flex flex-col gap-4">
          <AlertDialog.Title>Are you sure?</AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            This action will permanently delete this Block.
          </AlertDialog.Description>
          <div className="flex justify-end gap-4">
            <AlertDialog.Cancel asChild>
              <Button>Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button color="red" onClick={() => deleteBlock(blockId)}>
                Delete Block
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
