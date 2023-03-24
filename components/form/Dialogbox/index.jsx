import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

const DialogBox = () => {

  const closeDialog = () => {

  }

  const openDialog = () => {

  }

  return (
    <>
      <Dialog 
        open={openDialog} 
        onClose={closeDialog} 
        aria-labelledby=""
      >
        <DialogTitle id="idsd">
          
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="default">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogBox;