import React from 'react';
import { Box, Typography, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import DescriptionIcon from '@mui/icons-material/Description';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          Made by Dushyant
        </Typography>
        <Box sx={{ ml: { sm: 2 }, mt: { xs: 1, sm: 0 } }}>
          <IconButton
            component={Link}
            href="https://github.com/dushyant264"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            size="small"
          >
            <GitHubIcon fontSize="small" />
          </IconButton>
          <IconButton
            component={Link}
            href="https://drive.google.com/file/d/1W8wnl8cbf2-VUinq9rknNNEdjA8WBK65/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            size="small"
          >
            <DescriptionIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
