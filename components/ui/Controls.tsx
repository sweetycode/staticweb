import type { ComponentChild } from "preact";

export function Toggle({value, onChange, children}: {value: boolean, onChange:(value: boolean) => void, children: ComponentChild}) {
    return <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" class="sr-only peer" checked={value} onChange={e => onChange&&onChange((e.target as any).checked)}/>
        <div class="relative w-7 h-4 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
        <span class="ms-1 text-gray-900">{children}</span>
    </label>
}


export function CheckBox({value, onChange, children, className, size='base'}: {
    value: boolean,
    onChange: (checked: boolean) => void,
    children: ComponentChild,
    className?: string,
    size?: 'small'|'base'|'large',
}) {
    const boxSize = size == 'small' ? 'h-3 w-3': (size == 'base'? 'h-4 w-4': 'h-5 w-5')
    return <label class={`inline-flex items-center text-gray-900 ${className}`}>
        <input
            checked={value}
            onChange={e => onChange((e.target as any).checked)}
            type="checkbox"
            className={`${boxSize} text-blue-600 bg-gray-100 border-gray-300 rounded me-1`}/>
        {children}
    </label>
}