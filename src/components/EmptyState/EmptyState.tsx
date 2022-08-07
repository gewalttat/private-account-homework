import { Box, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const EmptyState = () => {
    return (
        <>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    '& .MuiTextField-root': { width: '25ch' },
                }}>
                <div>Please log-in with your username first</div>
                <Button component={Link}
                    to="/"
                    color="warning"
                >to log-in page</Button>
            </Box>
        </>
    )
}