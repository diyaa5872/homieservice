import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Link from '@mui/material/Link';
import {useNavigate} from 'react-router-dom'

export default function BasicModalDialog() {
  const [open, setOpen] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(true);
  const navigate=useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted")
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      username: data.get('username'),
      fullname: data.get('fullname')
    });
    setOpen(false); // Close the modal after form submission

    navigate('/mainpage')
  };

  const handleToggle = () => {
    setOpen(true);
    setIsLogin(!isLogin);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        onClick={handleToggle}
      >
        {isLogin ? 'Register' : 'Login'}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>{isLogin ? 'Login' : 'Register'}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {!isLogin && (
                  <FormControl>
                    <FormLabel htmlFor="username" id="username">Username</FormLabel>
                    <Input id="username" name='username' autoFocus required />
                  </FormControl>
                )}
                <FormControl>
                  <FormLabel htmlFor="email" id="email">Email</FormLabel>
                  <Input id="email" name='email' autoFocus required />
                </FormControl>
                {!isLogin && (
                  <FormControl>
                    <FormLabel htmlFor="fullName" id="fullName">Full Name</FormLabel>
                    <Input id="fullName" name='fullName' required />
                  </FormControl>
                )}
                <FormControl>
                  <FormLabel htmlFor="password" id="password">Password</FormLabel>
                  <Input id="password" name='password' required />
                </FormControl>
                <Button type="submit">{isLogin ? 'Login' : 'Register'}</Button>
                <Link href="#" variant="body2" onClick={handleToggle}>
                  {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                </Link>
              </Stack>
            </form>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}


