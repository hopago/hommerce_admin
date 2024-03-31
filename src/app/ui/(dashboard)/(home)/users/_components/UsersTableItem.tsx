import Link from "next/link";

import UserProfile from "./UserProfile";
import Button from "../../_components/Button";

import { getFullDate } from "@/app/ui/lib/utils";
import { useManageUsers } from "@/app/store/use-manage-users";
import { useRouter } from "next/navigation";

type UsersTableItemProps = {
  user: UserInfo;
};

export default function UsersTableItem({ user }: UsersTableItemProps) {
  const { addUsername } = useManageUsers();

  const router = useRouter();

  const onClick = () => {
    addUsername(user._id);
    router.push("/users/management");
  };

  return (
    <tr>
      <td>
        <UserProfile imageUrl={user.imageUrl} username={user.username} />
      </td>
      <td>{user.email}</td>
      <td>{getFullDate(user.createdAt)}</td>
      <td>{user.grade}</td>
      <td>{user.status}</td>
      <td>
        <Button
          type="button"
          text="관리하기"
          className="manage"
          onClick={onClick}
        />
      </td>
    </tr>
  );
}
