import React from 'react';
import RoundButton from '../neon-button/RoundButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import TextField from "@material-ui/core/TextField";
import Button from '@mui/material/Button';

const style = {
    borderRadius: '25px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function RegisterModal(args) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <div>
      <RoundButton name={"Register"} onClick={handleOpen}></RoundButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box className="modal-box" sx={style}>
            <Grid>
                <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
                Create an account
                </Typography>   
            </Grid>
            <Grid>
                <Typography sx={ {paddingLeft: '5px', paddingTop: '5px', color: '#7f7f7f'} }>Email</Typography>
                <TextField 
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    id="email">
                </TextField>
            </Grid>
            <Grid>
                <Typography sx={ {paddingLeft: '5px', paddingTop: '5px', color: '#7f7f7f'} }>Password</Typography>
                <TextField 
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    id="password">
                </TextField>
            </Grid>
            <Grid>
                <Typography sx={ {paddingLeft: '5px', paddingTop: '5px', color: '#7f7f7f'} }>Confirm Password</Typography>
                <TextField 
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    id="confirmPassword">
                </TextField>
            </Grid>
            <h2></h2>
            <Grid>
                <Button variant="contained" align='center'>Create Account</Button>
                <Button variant="outlined" align='center' sx= { {marginLeft: '10px'} }>Cancel</Button>
            </Grid>
        </Box>
    </Modal>
    </div>
  );
}

