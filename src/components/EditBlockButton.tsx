import { useNavigate } from 'react-router-dom';
import { EditorButton } from '@/components/EditorButton';
import { EditIcon } from '@/components/Icons';

export function EditBlockButton({ blockId }: { blockId: number }) {
  const navigate = useNavigate();
  const onClick = () => navigate(`/block/edit?id=${blockId}`);
  return <EditorButton icon={<EditIcon />} onClick={onClick} />;
}
