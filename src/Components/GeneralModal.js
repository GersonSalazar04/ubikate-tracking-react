import { Box, Button, Divider, IconButton, Modal, Typography } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const GeneralModal = (props) => {
    const { open, handleClose, title, successButtonName, icon, secondActionButtonName, footer, secondActionFunction, children } = props;
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.default',
        borderRadius: '2em',
        boxShadow: 24,
        width: "100%"
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} maxWidth="md">

                <Box p={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', bgcolor: 'background.paper', padding: 1.5, borderRadius: '50%' }}>
                            {icon}
                        </Box>
                        <Typography id="modal-modal-title" variant="h6" sx={{ fontWeight: 700 }} >
                            {title}
                        </Typography>
                    </Box>
                    <IconButton onClick={handleClose} color="inherit" aria-label="Cerrar">
                        <CloseOutlinedIcon />
                    </IconButton>
                </Box>
                <Divider variant="fullWidth" />

                <Box mt={3} sx={{ height: "25em", overflow: "auto" }} mb={footer ? 0: 4}>
                    {children}
                </Box>
                {
                    footer && <Box p={4} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
                        <Button variant="text" sx={{ color: 'text.primary', textTransform: 'none', fontWeight: '700' }} onClick={secondActionFunction}>
                            {secondActionButtonName}
                        </Button>
                        <Button variant="contained" color="secondary" sx={{ textTransform: 'none', fontWeight: '700', borderRadius: 30, color: 'secondaryTextColor.main' }}>
                            {successButtonName}
                        </Button>
                    </Box>
                }
            </Box>
        </Modal>
    )
}

export default GeneralModal;