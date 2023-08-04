import { cva } from 'class-variance-authority'

const buttonVariants = cva(
  "px-8 py-3 rounded-md border text-[1.4rem] font-medium flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-white hover:bg-slate-700",
        outline: "bg-transparent border border-slate-200 hover:bg-slate-100"
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2 rounded-md'
      },
      defaultVariants: {
        variant: 'default',
        size: 'default'
      }
    }
  }
)

const Button = () => {
  return (
    <button>Button</button>
  )
}

export { Button, buttonVariants }