import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
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
function SignIn() {
    const [isOpen, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    return (<>
        <div className='sign-in-container'>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ maxHeight: '80%', overflow: 'auto' }}
            >
                <Box sx={style}>
                    <form>
                        <h1>Log In</h1>
                        <input type='email' value={email} placeholder='Enter Email'
                            onChange={(e) => setemail(e.target.value)}
                        ></input>
                        <input type='password' value={password} placeholder='Enter Password'
                            onChange={(e) => setpassword(e.target.value)}
                        ></input>
                        <input type='submit'>Login</input>

                    </form>
                </Box>
            </Modal>
        </div>
    </>
    )
}

export default SignIn