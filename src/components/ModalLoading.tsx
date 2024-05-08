import { Dialog, DialogBody, DialogHeader, DialogFooter } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";


const ModalLoading = (props: { openValue: boolean, handleOpenLoading: any }) => {
    return (
        <Dialog open={props.openValue} handler={props.handleOpenLoading} >
            <DialogHeader className="flex items-center content-center">
                <div className="mx-auto">Cargando...</div></DialogHeader>
            <DialogBody className="flex">
                <Spinner className=" h-12 w-12 mx-auto " color="blue" />
            </DialogBody>
        </Dialog>
    )
}

export default ModalLoading