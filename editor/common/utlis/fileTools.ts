import { ChangeEvent, DragEvent, KeyboardEvent } from "react";
import { state, working_copy } from "../state";
import { handleProjectLoad } from "./projectTools";
import { v4 as uuid } from "uuid";
import { updateStatus } from "./editorTools";

export function getDimensions(file: File | string): Promise<Dimensions> {
  // check for base64 string image
  if (typeof file === "string") {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const { width, height } = img;
        resolve({ width, height });
      };
      img.onerror = reject;
      img.src = file;
    });
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const { width, height } = img;
      resolve({ width, height });
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

export const convertToBase64 = (url: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(url);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const handleFileUpload = (
  event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLLabelElement>,
) => {
  const arr =
    event.nativeEvent.type === "drop"
      ? (event as DragEvent<HTMLLabelElement>).dataTransfer.files
      : (event as ChangeEvent<HTMLInputElement>).target.files;
  const files = Array.from(arr as FileList);

  const isProject =
    files.length && files[0].type.startsWith("application/json");
  if (files.length === 1 && isProject) {
    const file = files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onprogress = (e) => {
      updateStatus(`Loading ${Math.round((e.loaded / e.total) * 100)}%`);
    };
    reader.onerror = () => {
      console.log(reader.error);
      return;
    };
    reader.onload = () => {
      const project = JSON.parse(reader.result as string);
      handleProjectLoad(project, "disk");
    };
    return;
  }
  const isImage = files.length && files[0].type.startsWith("image/");
  if (isImage) {
    const imageFiles: File[] = files.filter((file) =>
      file.type.startsWith("image/"),
    );
    const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));
    working_copy.images = imageUrls;

    if (working_copy.project?.frames.length === 0) {
      const new_project_uuid = uuid().slice(0, 8);
      working_copy.uuid = new_project_uuid;
      getDimensions(files[0]).then(
        (res: unknown) => (working_copy.dimensions = res as Dimensions),
      );
      working_copy.frames = imageUrls.map(() => []);
    }
    working_copy.history = { undo: [], redo: [] };
    working_copy.history?.undo.unshift(`added ${files.length} images`);
  }
};

// const handleImageDirectory = (imgDir: string) => {
//   console.log(process.cwd());
//   // console.log(imgDir);
// };

// uploader event handlers
export const onDragEnter = (e: DragEvent<HTMLLabelElement>) => {
  e.preventDefault();
  e.stopPropagation();
  if (e.dataTransfer.items.length === 1) {
    const item = e.dataTransfer.items[0];
    if (item.kind === "file" && item.type.startsWith("application/json")) {
      state.inputText = `Drop your JSON here`;
    }
  } else {
    state.inputText = `Drop ${e.dataTransfer.items.length} files Here`;
  }
  e.currentTarget.classList.add(
    "animate-pulse",
    "bg-slate-400/50",
    "dark:bg-slate-800/50",
  );
};

export const onDragOver = (e: DragEvent<HTMLLabelElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

export const onDrop = (e: DragEvent<HTMLLabelElement>) => {
  e.preventDefault();
  e.stopPropagation();
  handleFileUpload(e);
  state.inputText = "Drop Images or JSON Here";
  e.currentTarget.classList.remove(
    "animate-pulse",
    "bg-slate-400/50",
    "dark:bg-slate-800/50",
  );
};

export const onDragLeave = (e: DragEvent<HTMLLabelElement>) => {
  e.preventDefault();
  state.inputText = "Drop Images or JSON Here";
  e.currentTarget.classList.remove(
    "animate-pulse",
    "bg-slate-400/50",
    "dark:bg-slate-800/50",
  );
};

export const onKeyUp = (e: KeyboardEvent<HTMLLabelElement>) => {
  e.preventDefault();
  if (e.key !== "Enter") return;
  const input = document.getElementById("files") as HTMLInputElement;
  input.click();
};
