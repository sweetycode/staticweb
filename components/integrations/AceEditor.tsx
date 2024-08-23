import _ from "@staticweb/utils/dash";
import { dynScript, dynStyle } from "@staticweb/utils/dom";
import { useEffect, useRef } from "preact/hooks";

export default function AceEditor({value='', lang='text', onChange, debounce=700, className, wrap=false}: {
    value?: string,
    lang: 'text'|'json'|'markdown'|'html'|'csv'|'javascript'|'sql',
    onChange: (value: string) => any,
    debounce?: number,
    className?: string,
    wrap?: boolean,
}) {
    const containerRef = useRef(null)
    const editorRef = useRef(null)
    const lastValueRef = useRef(null)

    useEffect(() => {
        dynStyle('https://cdn.jsdelivr.net/npm/ace-builds@1.35.2/css/ace.min.css')
        dynScript('https://cdn.jsdelivr.net/npm/ace-builds@1.35.2/src-min-noconflict/ace.js').then(() => {
            const elemId = `editor-${_.autoInc()}`
            containerRef.current.id = elemId
            containerRef.current.style.fontSize = '18px'
            editorRef.current = window['ace'].edit(elemId, {})
            editorRef.current.setTheme("ace/theme/textmate");
            if (onChange) {
                editorRef.current.session.on('change', _.debounce(() => {
                    const newValue = editorRef.current.getValue()
                    if (newValue != lastValueRef.current) {
                        onChange(lastValueRef.current = newValue)
                    }
                }, debounce))
            }
        })

        return () => {
            if (editorRef.current) {
                editorRef.current.destroy()
                editorRef.current = null
            }
        }
    }, [])

    useEffect(() => {
        if (editorRef.current && value != lastValueRef.current) {
            lastValueRef.current = value
            editorRef.current.setValue(value)
        }
    }, [value])

    useEffect(() => {
        editorRef.current && editorRef.current.session.setUseWrapMode(wrap);
    }, [wrap])

    useEffect(() => {
        editorRef.current && editorRef.current.session.setMode(`ace/mode/${lang}`)
    }, [lang])

    return <div ref={containerRef} className={`${className}`}></div>
}
