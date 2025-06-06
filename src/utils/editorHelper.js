import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import { useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link';

export const MenuBar = ({ callAI, disable }) => {
    const { editor } = useCurrentEditor()
    if (!editor) {
        return null
    }

    const applyColoredHighlight = (textColor, bgColor) => {
        editor.chain().focus().toggleHighlight({ color: bgColor }).run()
        setTimeout(() => {
            editor.chain().focus().setColor(textColor).run()
        }, 10)
    }
    return (
        // <div className="control-group">
        <div className="button-group">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={disable || !editor.can().chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                B
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={disable || !editor.can().chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}>
                I
            </button>
            {/* <button type="button"
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                    Clear marks
                </button>
                <button type="button"
                    onClick={() => editor.chain().focus().clearNodes().run()}>
                    Clear nodes
                </button> */}
            <button
                type="button"
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? 'is-active' : ''}
                disabled={disable}
            >
                P
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                disabled={disable} >
                H1
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                disabled={disable}  >
                H2
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                disabled={disable}      >
                H3
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
                disabled={disable}   >
                Bullet list
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
                disabled={disable}  >
                Number list
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
                disabled={disable}    >
                quote
            </button>
            <button
                type="button"
                onClick={() => {
                    editor.chain().focus().setColor('#171717').run()
                    editor.chain().focus().toggleHighlight({ color: '#FFFFFF' }).run()
                }}
                className={`${editor.isActive('highlight', { color: '#FFFFFF' }) ? 'is-active' : ''}`}
                disabled={disable}    >
                A
            </button>
            <button
                type="button"
                onClick={() => {
                    applyColoredHighlight(editor.isActive('highlight', { color: '#dcfce7' }) ? "#171717" : " #008236", "#dcfce7")
                }}
                className={`bg-green-100! text-success! ${editor.isActive('highlight', { color: '#dcfce7' }) ? 'is-active' : ''}`}
                disabled={disable}  >
                A
            </button>
            <button
                type="button"
                onClick={() => {
                    applyColoredHighlight(editor.isActive('highlight', { color: '#ffe2e2' }) ? "#171717" : "#c10007", "#ffe2e2")
                }}
                className={`bg-red-100! text-danger! ${editor.isActive('highlight', { color: '#ffe2e2' }) ? 'is-active' : ''}`}
                disabled={disable}    >
                A
            </button>
            <button
                type="button"
                onClick={() => {
                    applyColoredHighlight(editor.isActive('highlight', { color: '#dff2fe' }) ? "#171717" : "#0069a8", "#dff2fe")
                }}
                className={`bg-sky-100! text-sky-700! ${editor.isActive('highlight', { color: '#dff2fe' }) ? 'is-active' : ''}`}
                disabled={disable}    >
                A
            </button>
            <button
                type="button"
                onClick={() => {
                    applyColoredHighlight(editor.isActive('highlight', { color: '#fef9c2' }) ? "#171717" : "#a65f00", "#fef9c2")
                }}
                className={`bg-yellow-100! text-yellow-700! ${editor.isActive('highlight', { color: '#fef9c2' }) ? 'is-active' : ''}`}
                disabled={disable}   >
                A
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={disable || !editor.can().chain().focus().undo().run()}
            >
                Undo
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={disable || !editor.can().chain().focus().redo().run()}
            >
                redo
            </button>
            {callAI && <button
                type="button"
                onClick={callAI}
                disabled={disable}
            >
                undo
            </button>}
        </div>
        // </div >
    )
}

export const extensions = [
    Highlight.configure({
        multicolor: true,
    }),
    Link.configure({
        linkOnPaste: true,
        openOnClick: true, // Prevents auto-opening links
        autolink: true, // Automatically detects links
    }),
    Placeholder.configure({ placeholder: 'Start typing here...', }),
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
]
