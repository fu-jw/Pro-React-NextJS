import { ExtendedUser } from "@/next-auth";
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface UserInfoProps {
  user?: ExtendedUser
  label: string
}

export const UserInfo = ({ 
  user,
  label 
}: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          {label}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* ID */}
        <div className="flex flex-row justify-between 
        items-center rounded-lg border shadow-sm">
          <p className="text-sm font-medium">
            ID 
          </p>
          <p className="truncated text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>
        {/* Name */}
        <div className="flex flex-row justify-between 
        items-center rounded-lg border shadow-sm">
          <p className="text-sm font-medium">
            Name
          </p>
          <p className="truncated text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        {/* Email */}
        <div className="flex flex-row justify-between 
        items-center rounded-lg border shadow-sm">
          <p className="text-sm font-medium">
            Email
          </p>
          <p className="truncated text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        {/* Role */}
        <div className="flex flex-row justify-between 
        items-center rounded-lg border shadow-sm">
          <p className="text-sm font-medium">
            Role
          </p>
          <p className="truncated text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.role}
          </p>
        </div>
        {/* Created At */}
        <div className="flex flex-row justify-between 
        items-center rounded-lg border shadow-sm">
          <p className="text-sm font-medium">
            2FA
          </p>
          <Badge
            variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}
          >
            {user?.isTwoFactorEnabled ? 'ON' : 'OFF'}
          </Badge>
        </div>

      </CardContent>
    </Card>
  );
}