// components/UserRow.tsx
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '../../lib/supabaseClient';

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

type UserRowProps = {
  user: User;
  refetchUsers: () => void;
};

export const UserRow = ({ user, refetchUsers }: UserRowProps) => {
  const { toast } = useToast();

  const deleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete user',
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Success',
          description: 'User deleted successfully',
        });
        refetchUsers();
      }
    }
  };

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={`https://ui-avatars.com/api/?name=${user.user_metadata?.full_name || user.email}&background=random`} />
            <AvatarFallback>{user.email.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.user_metadata?.full_name || 'No name'}</p>
            <p className="text-sm text-gray-500">ID: {user.id.substring(0, 6)}...</p>
          </div>
        </div>
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.user_metadata?.phone || 'N/A'}</TableCell>
      <TableCell>
        <Badge
          variant={
            user.user_metadata?.role === 'admin'
              ? 'destructive'
              : user.user_metadata?.role === 'staff'
              ? 'secondary'
              : 'default'
          }
        >
          {user.user_metadata?.role || 'member'}
        </Badge>
      </TableCell>
      <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => deleteUser(user.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};