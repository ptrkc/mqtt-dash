import { useNavigate } from 'react-router-dom';
import { EditorButton } from '@/components/EditorButton';
import { PlusIcon } from '@/components/Icons';

export function AddBlockButton({ groupId }: { groupId: number }) {
  const navigate = useNavigate();
  const onClick = () => navigate(`/block/add?groupId=${groupId}`);
  return <EditorButton icon={<PlusIcon />} onClick={onClick} />;
}
