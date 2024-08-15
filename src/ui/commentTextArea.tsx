import React, {
  useState,
  useRef,
  FocusEvent,
  useEffect,
  KeyboardEvent,
} from "react";
import { cn } from "@/components/lib/utils"; // Assuming you have a utility function for classNames
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import useDeleteNote from "@/hooks/Notes/useDeleteNote";
import useUpdateNote from "@/hooks/Notes/useUpdateNote";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { ThreeDots } from "react-loader-spinner";

interface EditableDivProps {
  value: string;
  isEdited: boolean;
  onChange: (value: string) => void;
  onBlur?: (event: FocusEvent<HTMLDivElement>) => void;
  onFocus?: (event: FocusEvent<HTMLDivElement>) => void;
  memberId?: string;
  noteId?: string;
  readOnly?: boolean;
  className?: string;
}

const EditableDiv: React.FC<EditableDivProps> = ({
  value,
  isEdited,
  onChange,
  onBlur,
  onFocus,
  className = "",
  ...props
}) => {
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const editableRef = useRef<HTMLDivElement | null>(null);
  const { mutate: updateNote, isPending } = useUpdateNote({
    memberId: props.memberId ?? "",
  });
  const { mutate: deleteNote, isPending: isDeleting } = useDeleteNote(
    props.memberId ?? ""
  );

  const handleInput = () => {
    if (editableRef.current) {
      onChange(editableRef.current.innerText);
    }
  };

  const closeDialog = () => {
    // close dialog
    return false;
  };

  // Handle Update Note
  const handleUpdateNote = () => {
    if (editableRef.current) {
      updateNote({
        noteId: props.noteId ?? "",
        note: editableRef.current.innerText,
        memberId: props.memberId ?? "",
      });
    }
  };

  const handleDeleteNote = () => {
    deleteNote({
      noteId: props.noteId ?? "",
      memberId: props.memberId ?? "",
    });
  };

  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    setIsEditing(true);
    if (onFocus) onFocus(event);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    setIsEditing(false);
    setReadOnly(true);
    if (onBlur) onBlur(event);
  };

  const handleEditClick = () => {
    if (editableRef.current) {
      setReadOnly(false);
      setIsEditing(true);
      editableRef.current.focus();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        editableRef.current &&
        !editableRef.current.contains(e.target as Node)
      ) {
        // console.log("Clicked outside");
        setReadOnly(true);
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      //   console.log("Removing event listener");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent adding a new line
      if (isEditing && !isPending) {
        handleUpdateNote();
        setReadOnly(true);
        setIsEditing(false);
      }
    }
  };

  useEffect(() => {
    // Force a re-render when `isEditing` changes to ensure state is reflected in UI
    if (!isEditing && !readOnly) {
      setReadOnly(true);
    }
    editableRef.current?.focus();
  }, [isEditing, readOnly]);
  return (
    <div className="relative">
      <div
        ref={editableRef}
        contentEditable={!readOnly}
        spellCheck={false}
        suppressContentEditableWarning={true}
        className={cn(
          `border-0 px-2 pb-2 pt-3 rounded-md text-base relative text-wrap break-before-auto ${
            !readOnly
              ? "focus:ring-1 focus:ring-blue-500 caret-primary focus:outline-none focus-within:outline-none focus-visible:!outline-none"
              : "bg-gray-100"
          }`,
          className
        )}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        {...props}>
        {value}
        {readOnly && isEdited && (
          <span className="absolute top-0 right-0 bg-white text-gray-500 text-xs px-1 rounded-bl-md rounded-tr-md">
            edited
          </span>
        )}
      </div>
      <div className="flex justify-end space-x-2 mt-2">
        <div className="text-gray-400 text-sm">
          {isPending ? "Saving..." : ""}
        </div>
        <button onClick={handleEditClick} disabled={isPending}>
          <FiEdit
            className="text-gray-400 text-lg cursor-pointer"
            aria-disabled={isPending}
          />
        </button>
        <Dialog onOpenChange={(open) => !open && closeDialog()}>
          <DialogTrigger asChild>
            <button disabled={isDeleting}>
              <MdOutlineDelete
                className="text-red-500 text-lg cursor-pointer"
                aria-disabled={isDeleting}
              />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white rounded-lg">
            <DialogHeader className="text-start">
              <DialogTitle>Delete Note</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Are you sure you want to delete this note?
            </DialogDescription>
            <DialogFooter>
              <button
                onClick={handleDeleteNote}
                className="text-white font-semibold bg-red-500 py-3 rounded-md flex w-full justify-center">
                {isDeleting ? (
                  <ThreeDots color="white" height={15} />
                ) : (
                  "Delete"
                )}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EditableDiv;
