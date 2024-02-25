import { Dialog, DialogBody, DialogHeader, Typography } from '@material-tailwind/react'
import React from 'react'
import { IoWarningOutline } from 'react-icons/io5'

type dialogProps = {
    openDialog: boolean,
    dialogInfo: {
        title: string,
        message: string,
    },
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const DialogInfo = (props: dialogProps) => {
    const { openDialog, dialogInfo, setOpenDialog } = props;
    return (
        <Dialog open={openDialog} handler={() => setOpenDialog(!openDialog)}>
            <DialogHeader>
                <Typography variant="h3" className="flex items-center justify-start gap-2 text-black">
                    {dialogInfo.title}
                </Typography>
            </DialogHeader>
            <DialogBody>
                <Typography variant="h5" className="flex items-center justify-start gap-2 text-blue-gray-900">
                    <IoWarningOutline className="w-10 h-10 text-amber-400" />
                    {dialogInfo.message}
                </Typography>
            </DialogBody>
        </Dialog>
    )
}

export default DialogInfo
