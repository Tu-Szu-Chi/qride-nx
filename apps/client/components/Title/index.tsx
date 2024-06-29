import { HTMLAttributes } from "react"

type Props = HTMLAttributes<HTMLHeadElement>

const Title: React.FC<Props> = ({ children, className, ...props }: Props) => {
    return <h1 className={`text-4xl text-center mb-20 ${className}`}>{children}</h1>
}

export default Title