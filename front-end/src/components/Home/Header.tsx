import { LucideLogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "../../redux/actions/logoutUser.action";
import { format } from "date-fns";
export const HeaderBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogoutAction());
  };
  const {user}=useSelector((state:RootState)=>state.user)
  return (
    <header className="w-full h-16 flex items-center rounded-2xl shadow-sm border px-3 justify-between">
      <div className="flex gap-2 h-full items-center">
        <img
          src={"/images/user.jpg"}
          className="rounded-full object-cover size-12"
          alt=""
        />
        <div className="flex flex-col">
          <span className="text-sm">Hi, {user?.name}</span>
          <h3 className="font-medium">
            {format(new Date(), "EEE, d MMM, yyyy")}
          </h3>
        </div>
      </div>
      <div className="size-12 rounded-2xl border flex items-center justify-center cursor-pointer">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <LucideLogOut className="w-5 font-thin text-gray-600" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  );
};
