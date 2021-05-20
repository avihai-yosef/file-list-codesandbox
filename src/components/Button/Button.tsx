import styles from "./Button.module.css";

const Button = ({className, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return <button
        className={`${styles.root} ${className}`}
        {...props}
    >
    </button>
}

export default Button