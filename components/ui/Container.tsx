export default function Container({children, className=''}) {
    return <div className={`max-w-4xl mx-auto p-4 ${className}`}>
        {children}
    </div>
}