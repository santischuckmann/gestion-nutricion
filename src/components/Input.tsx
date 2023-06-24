import { DetailedHTMLProps, InputHTMLAttributes } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  registration: () => UseFormRegisterReturn<string>
}

export const Input = ({
  registration,
  ...props
}: InputProps) => {
  return (
    <input className="border rounded border-gray-950" {...props} {...registration()} />
  )
}