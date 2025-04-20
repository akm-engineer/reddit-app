import { cn, generateAvatarFromName } from "@/lib/utils"

export const UserAvatar = ({
  avatarUrl,
  name,
  size,
  className,
}: {
  avatarUrl: string | null | undefined
  name: string
  size?: number
  className?: string
}) => {
  return (
    <>
      {avatarUrl && avatarUrl.length > 0 ? (
        <img
          src={avatarUrl ?? "/avatar-placeholder.png"}
          alt={name ?? "User Avatar"}
          width={size ?? 40}
          height={size ?? 40}
          className={cn(
            "aspect-square h-fit flex-none  rounded-full bg-secondary object-cover",
            className
          )}
        />
      ) : (
        <Avatar name={name} className={className} size={size} />
      )}
    </>
  )
}

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  className?: string
  size?: number
}

const Avatar = ({ name, className = "", size = 40, ...props }: AvatarProps) => {
  const { initials, backgroundColor, textColor } = generateAvatarFromName(name)

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-semibold flex-shrink-0",
        className
      )}
      style={{
        width: size,
        height: size,
        backgroundColor,
        color: textColor,
        fontSize: size * 0.5,
      }}
      {...props}
    >
      {initials}
    </div>
  )
}
