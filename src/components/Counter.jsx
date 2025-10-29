import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../features/counterSlice.jsx';
import { Button, Card, CardContent, Typography, Stack } from '@mui/material';
import './Counter.css';

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  // Keyboard Event Listener
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowUp') {
        dispatch(increment());
      } else if (event.key === 'ArrowDown') {
        dispatch(decrement());
      } else if (event.key === 'Backspace') {
        dispatch(reset());
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Cleanup event on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [dispatch]);

  return (
    <Card className="counter-card">
      <CardContent>
        <Typography variant="h4" gutterBottom>Redux Counter</Typography>
        <Typography variant="h5" className="counter-value">Value: {count}</Typography>
        <Typography variant="body2" style={{ marginBottom: '20px', opacity: 0.7 }}>
          ↑ Increment | ↓ Decrement | ⌫ Reset
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" className="button-group">
          <Button variant="contained" onClick={() => dispatch(increment())}>Increment</Button>
          <Button variant="contained" color="secondary" onClick={() => dispatch(decrement())}>Decrement</Button>
          <Button variant="outlined" color="error" onClick={() => dispatch(reset())}>Reset</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Counter;
