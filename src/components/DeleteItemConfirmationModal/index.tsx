import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface DeleteConfirmationProps {
  open: boolean
  onClose: () => void;
  onConfirm: () => void;
}
const DeleteItemConfirmationModal: React.FC<DeleteConfirmationProps> = ({open,onClose,onConfirm}) =>{
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmação de Exclusão</DialogTitle>
      <DialogContent>
        <p> Você tem certeza que deseja deletar esse item? Esta ação não poderá ser desfeita!!</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="secondary">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default DeleteItemConfirmationModal