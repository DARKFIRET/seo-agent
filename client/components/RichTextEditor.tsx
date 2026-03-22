import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Heading2,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link as LinkIcon,
  Undo,
  Redo,
} from "lucide-react";
import { useCallback } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Введите содержание...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Image.configure({
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const addImage = useCallback(() => {
    if (!editor) return;

    const url = window.prompt("URL картинки:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL ссылки:", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border-2 border-border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-secondary/50 border-b border-border p-2 md:p-3 flex flex-wrap gap-1 md:gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-1.5 md:p-2 rounded-lg transition-colors ${
            editor.isActive("bold")
              ? "bg-primary text-white"
              : "hover:bg-secondary text-foreground/70"
          }`}
          title="Жирный (Ctrl+B)"
        >
          <Bold size={16} className="md:w-5 md:h-5" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-1.5 md:p-2 rounded-lg transition-colors ${
            editor.isActive("italic")
              ? "bg-primary text-white"
              : "hover:bg-secondary text-foreground/70"
          }`}
          title="Курсив (Ctrl+I)"
        >
          <Italic size={16} className="md:w-5 md:h-5" />
        </button>

        <div className="w-px bg-border" />

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-1.5 md:p-2 rounded-lg transition-colors ${
            editor.isActive("heading", { level: 2 })
              ? "bg-primary text-white"
              : "hover:bg-secondary text-foreground/70"
          }`}
          title="Заголовок"
        >
          <Heading2 size={16} className="md:w-5 md:h-5" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 md:p-2 rounded-lg transition-colors ${
            editor.isActive("bulletList")
              ? "bg-primary text-white"
              : "hover:bg-secondary text-foreground/70"
          }`}
          title="Маркированный список"
        >
          <List size={16} className="md:w-5 md:h-5" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 md:p-2 rounded-lg transition-colors ${
            editor.isActive("orderedList")
              ? "bg-primary text-white"
              : "hover:bg-secondary text-foreground/70"
          }`}
          title="Нумерованный список"
        >
          <ListOrdered size={16} className="md:w-5 md:h-5" />
        </button>

        <div className="w-px bg-border" />

        <button
          onClick={addImage}
          className="p-1.5 md:p-2 rounded-lg hover:bg-secondary text-foreground/70 transition-colors"
          title="Добавить картинку"
        >
          <ImageIcon size={16} className="md:w-5 md:h-5" />
        </button>

        <button
          onClick={addLink}
          className={`p-1.5 md:p-2 rounded-lg transition-colors ${
            editor.isActive("link")
              ? "bg-primary text-white"
              : "hover:bg-secondary text-foreground/70"
          }`}
          title="Добавить ссылку"
        >
          <LinkIcon size={16} className="md:w-5 md:h-5" />
        </button>

        <div className="w-px bg-border" />

        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-1.5 md:p-2 rounded-lg hover:bg-secondary text-foreground/70 transition-colors disabled:opacity-50"
          title="Отменить"
        >
          <Undo size={16} className="md:w-5 md:h-5" />
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-1.5 md:p-2 rounded-lg hover:bg-secondary text-foreground/70 transition-colors disabled:opacity-50"
          title="Повторить"
        >
          <Redo size={16} className="md:w-5 md:h-5" />
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-3 md:p-4 min-h-48 md:min-h-64"
      />
    </div>
  );
}
