export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-emerald-brand shadow-sm focus:ring-emerald-brand transition-colors ' +
                className
            }
        />
    );
}
