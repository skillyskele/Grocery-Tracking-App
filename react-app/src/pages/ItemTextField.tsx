import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const ItemTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    fontFamily: 'cursive',
  },
  '& .MuiInputLabel-root': {
    fontFamily: 'cursive',
    color: '#3CB371', // Default label color (Medium sea green)
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#2E8B57', // Focused label color (Darker medium sea green)
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7', // Default border color
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2', // Hover border color
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2E8B57', // Focused border color (Darker medium sea green)
    },
  },
});

export default ItemTextField;
