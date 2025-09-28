import { UserRoundIcon } from "lucide-react"
import Image from "next/image"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function UserAvatar({ user, size = 24, className }: { user: any, size?: number, className?: string }) {
    const iconSize = Math.floor(size * 0.6)
    
    if (user?.image) {
        return (
            <Image
                src={user.image}
                alt={user?.name ?? "User"}
                width={size}
                height={size}
                className="rounded-full"
                style={{ width: size, height: size }}
                quality={100}                
            />
        )
    }
    
    return (
        <div 
            className={`rounded-full bg-gray-600 flex items-center justify-center text-gray-300 ${className}`}
            style={{ width: size, height: size }}
        >
            <UserRoundIcon style={{ width: iconSize, height: iconSize }} />
        </div>
    )
}