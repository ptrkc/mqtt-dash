import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button } from '@/components/Button';
import { EditorButton } from '@/components/EditorButton';
import { TrashIcon } from '@/components/Icons';

export function DeleteModal({
  deleteFunction,
  description,
  deleteText,
}: {
  deleteFunction: () => void;
  description: string;
  deleteText: string;
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <EditorButton icon={<TrashIcon />} />
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black/50 fixed top-0 bottom-0 right-0 left-0" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-lg flex flex-col gap-4">
          <AlertDialog.Title>Are you sure?</AlertDialog.Title>
          <AlertDialog.Description>{description}</AlertDialog.Description>
          <div className="flex justify-end gap-4 p-1">
            <AlertDialog.Cancel asChild>
              <Button>Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button color="red" onClick={deleteFunction}>
                {deleteText}
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
