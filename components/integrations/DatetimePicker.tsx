import { dynScript, dynStyle } from "@staticweb/utils/dom"
import { useEffect, useRef } from "preact/hooks"

export function DateTimePicker({value, onChange}: {
    value: string,
    onChange: (newValue: string) => void,
}) {
    const ref = useRef(null)
    const instance = useRef(null)
    useEffect(() => {
        dynStyle('https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css')
        dynScript('https://cdn.jsdelivr.net/npm/flatpickr').then(() => {
            instance.current = window['flatpickr'](ref.current, {
                enableTime: true,
                dateFormat: 'Y-m-d H:i:S',
                enableSeconds: true,
            })
            instance.current.setDate(value, false, '')
        })

        return () => {
            if (instance.current != null) {
                instance.current.destroy()
                instance.current = null
            }
        }
    }, [])

    useEffect(() => {
        if (instance.current) {
            instance.current.setDate(value, false, '')
        }
    }, [value])

    return <input ref={ref} type='text' className="border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-2" onChange={e => onChange((e.target as any).value)}/>
}