import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    UnderlineIcon,
    LinkIcon,
    Pilcrow,
    Minus,
    Undo,
    Redo,
} from "lucide-react";
import { Toggle } from "@/Components/ui/toggle";
import { Separator } from "@/Components/ui/separator";
import { Button } from "./ui/button";
import { useCallback } from "react";

const RichTextEditor = ({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) => {
    const editor = useEditor({
        editorProps: {
            attributes: {
                class: "min-h-[150px] max-h-[150px] w-full rounded-md rounded-br-none rounded-bl-none border border-input bg-transparent px-3 py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
            },
        },
        extensions: [
            Underline,
            Link,

            StarterKit.configure({
                orderedList: {
                    HTMLAttributes: {
                        class: "list-decimal pl-4",
                    },
                },
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc pl-4",
                    },
                },
            }),
        ],
        content: value, // Set the initial content with the provided value
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML()); // Call the onChange callback with the updated HTML content
        },
    });

    return (
        <>
            {editor ? <RichTextEditorToolbar editor={editor} /> : null}
            <EditorContent editor={editor} />
        </>
    );
};

const RichTextEditorToolbar = ({ editor }: { editor: Editor }) => {
    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        if (url === null) {
            return;
        }

        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();

            return;
        }
        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
    }, [editor]);

    return (
        <div className="border border-input bg-transparent rounded-br-md rounded-bl-md p-1 flex flex-row items-center gap-1">
            <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                    editor.chain().focus().toggleBold().run()
                }
            >
                <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() =>
                    editor.chain().focus().toggleItalic().run()
                }
            >
                <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("underline")}
                onPressedChange={() =>
                    editor.chain().focus().toggleUnderline().run()
                }
            >
                <UnderlineIcon className="h-4 w-4" />
            </Toggle>
            <Separator orientation="vertical" className="w-[1px] h-8" />
            <Button
                variant="ghost"
                size="sm"
                onClick={setLink}
                className={editor.isActive("link") ? "is-active" : ""}
            >
                <LinkIcon className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="w-[1px] h-8" />
            <Toggle
                size="sm"
                pressed={editor.isActive("bulletList")}
                onPressedChange={() =>
                    editor.chain().focus().toggleBulletList().run()
                }
            >
                <List className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("orderedList")}
                onPressedChange={() =>
                    editor.chain().focus().toggleOrderedList().run()
                }
            >
                <ListOrdered className="h-4 w-4" />
            </Toggle>
            <Separator orientation="vertical" className="w-[1px] h-8" />
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.commands.setHorizontalRule()}
            >
                <Minus className="h-4 w-4" />
            </Button>
            <Button
                size="sm"
                onClick={() => editor.commands.setParagraph()}
                variant="ghost"
            >
                <Pilcrow className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="w-[1px] h-8" />
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.commands.undo()}
                disabled={!editor.can().undo()}
            >
                <Undo className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.commands.redo()}
                disabled={!editor.can().redo()}
            >
                <Redo className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default RichTextEditor;
