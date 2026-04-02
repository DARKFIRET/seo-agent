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
  Upload,
} from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";

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
  const { authFetch } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        allowBase64: false,
        HTMLAttributes: {
          class: "article-image",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    editorProps: {
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || []);
        const imageItem = items.find((item) => item.type.startsWith("image/"));

        if (imageItem) {
          const file = imageItem.getAsFile();
          if (file) {
            uploadAndInsertImage(file);
            return true;
          }
        }
        return false;
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer?.files?.length) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith("image/")) {
            uploadAndInsertImage(file);
            return true;
          }
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const uploadAndInsertImage = useCallback(
    async (file: File) => {
      if (!editor) return;

      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;

        try {
          const res = await authFetch("/api/upload", {
            method: "POST",
            body: JSON.stringify({
              image: base64,
              filename: file.name,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            editor.chain().focus().setImage({ src: data.url }).run();
          } else {
            alert("Ошибка при загрузке изображения");
          }
        } catch (err) {
          console.error("Upload error:", err);
          alert("Ошибка при загрузке изображения");
        }
      };
      reader.readAsDataURL(file);
    },
    [editor, authFetch],
  );

  // Sync value from props if it changes externally
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Пожалуйста, выберите изображение");
        return;
      }

      await uploadAndInsertImage(file);

      // Reset input
      event.target.value = "";
    },
    [uploadAndInsertImage],
  );

  const addImage = useCallback(() => {
    if (!editor) return;
    
    const choice = window.confirm("Загрузить изображение с компьютера? (Отмена — вставить ссылку)");
    
    if (choice) {
      fileInputRef.current?.click();
    } else {
      const url = window.prompt("URL картинки:");
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
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
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        accept="image/*"
      />
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
