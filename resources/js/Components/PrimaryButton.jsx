export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-brand px-6 py-2.5 text-sm font-semibold text-white transition duration-150 ease-in-out hover:bg-emerald-dark focus:bg-emerald-dark focus:outline-none focus:ring-2 focus:ring-emerald-brand focus:ring-offset-2 active:bg-emerald-dark ${disabled && 'opacity-25 relative'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
