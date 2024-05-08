import { Dialog, DialogBody, DialogHeader, DialogFooter, Button } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { signIn, signOut} from 'next-auth/react'


const ModalLogin = (props: { openValue: boolean, handleOpenLoading: any }) => {
    return (
        <Dialog open={props.openValue} handler={props.handleOpenLoading} >
            <DialogHeader className="flex items-center content-center">
                <div className="mx-auto">Es necesario contar con una cuenta Google para continuar</div></DialogHeader>
            <DialogBody className="flex">
                <Button className="mx-auto " onClick={() => signIn()} >
                    Continuar
                </Button>
            </DialogBody>
        </Dialog>
    )
}

export default ModalLogin