import * as React from "react"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border bg-neutral-900 px-2.5 py-0.5 text-xs font-semibold text-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-neutral-100/20",
  {
    variants: {
      variant: {
        default: ""
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
