// components/UserTable.tsx
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { UserRow } from './UserRow';

type User = {
  id: string;
  email: string;
  created_at: string;
  user_metadata?: {
    role?: string;
    full_name?: string;
    phone?: string;
    sacco_id?: string;
  };
};

type UserTableProps = {
  users: User[];
  loading: boolean;
  refetchUsers: () => void;
};

export const UserTable = ({ users, loading, refetchUsers }: UserTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Member</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8">
              Loading members...
            </TableCell>
          </TableRow>
        ) : users.length > 0 ? (
          users.map((user) => (
            <UserRow key={user.id} user={user} refetchUsers={refetchUsers} />
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8">
              No members found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};