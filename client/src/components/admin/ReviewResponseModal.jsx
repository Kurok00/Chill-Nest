import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addHostResponse } from '../../actions/reviewActions';

const ReviewResponseModal = ({ open, onClose, review }) => {
  const [comment, setComment] = useState(review?.host_response?.comment || '');
  const dispatch = useDispatch();

  const reviewHostResponse = useSelector((state) => state.reviewHostResponse);
  const { loading, error, success } = reviewHostResponse;

  const handleSubmit = () => {
    if (!comment.trim()) {
      return;
    }

    dispatch(addHostResponse(review._id, comment));
  };

  React.useEffect(() => {
    if (success) {
      onClose();
      setComment('');
    }
  }, [success, onClose]);

  React.useEffect(() => {
    if (review?.host_response?.comment) {
      setComment(review.host_response.comment);
    } else {
      setComment('');
    }
  }, [review]);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }
      }}
    >
      <DialogTitle sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontWeight: 'bold'
      }}>
        {review?.host_response?.comment ? 'Edit Host Response' : 'Add Host Response'}
      </DialogTitle>
      
      <DialogContent sx={{ mt: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {review && (
          <Box sx={{ mb: 3, p: 2, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Original Review
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              By: {review.user_id?.name} | Rating: {review.ratings?.overall}/5
            </Typography>
            <Typography variant="body1" sx={{ 
              fontStyle: 'italic',
              p: 1,
              borderLeft: '3px solid #667eea',
              bgcolor: 'rgba(255,255,255,0.5)'
            }}>
              "{review.comment}"
            </Typography>
          </Box>
        )}

        <TextField
          label="Host Response"
          multiline
          rows={4}
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your response to this review..."
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'rgba(255,255,255,0.9)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,1)',
              },
              '&.Mui-focused': {
                bgcolor: 'rgba(255,255,255,1)',
              }
            }
          }}
        />

        {review?.host_response?.responded_at && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Last updated: {new Date(review.host_response.responded_at).toLocaleString()}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, background: 'rgba(255,255,255,0.7)' }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{
            borderColor: '#667eea',
            color: '#667eea',
            '&:hover': {
              borderColor: '#764ba2',
              color: '#764ba2'
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={loading || !comment.trim()}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            }
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Save Response'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewResponseModal;
