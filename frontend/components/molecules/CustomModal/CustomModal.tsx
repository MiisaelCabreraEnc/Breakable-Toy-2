import { Button, Dialog, Typography } from "@material-tailwind/react";
import { FunctionComponent, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface CustomModalProps {
  title: string;
  description: string;
  icon: ReactNode;
  open: boolean;
  closeButtonMessage: string;
  onClose: () => void;
}

const CustomModal: FunctionComponent<CustomModalProps> = ({
  title,
  icon,
  description,
  open,
  closeButtonMessage,
  onClose,
}) => {
  const router = useRouter();

  return (
    <Dialog size="sm" open={open}>
      <Dialog.Overlay>
        <Dialog.Content className="p-8 outline-none border-none bg-opacity-50">
          <Typography type="h6" className="text-center mb-4">
            {title}
          </Typography>
          {icon}
          <Typography type="p" className="text-center text-foreground">
            {description}
          </Typography>
          <div className="mb-1 mt-8 flex items-center justify-center gap-2">
            <Button className="outline-none" onClick={onClose}>
              {closeButtonMessage}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
};

export default CustomModal;
