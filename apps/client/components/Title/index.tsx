import { HTMLAttributes } from "react"

type Props = HTMLAttributes<HTMLHeadElement>

const Title: React.FC<Props> = ({ children, className, ...props }: Props) => {
    return <h1 className={`text-3xl mb-20 leading-10 ${className}`}>{children}</h1>
}

export default Title