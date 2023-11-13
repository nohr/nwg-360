type Dimensions = { width: number; height: number };

type Tool = "select" | "add_unit" | "zoom" | "skew" | "scroll";

interface Unit {
  uuid: string;
  d: string;
  visible: boolean;
  number: {
    uuid: string;
    text: string;
    x: number;
    y: number;
  };
}

interface Project {
  uuid: string;
  [key: string]: any;
  title: string;
  dateCreated: string;
  dateModified: string;
  frames: Unit[][];
  currentIndex: number;
  dimensions: Dimensions;
  id?: symbol;
  history: {
    undo: string[];
    redo: string[];
  };
}

interface WorkingCopy extends Project {
  isChanged: boolean;
  images: string[];
}

interface TitleInputConfig {
  hidden: boolean;
  value: string;
}

interface TitleInputProps {
  titleInputConfig: TitleInputConfig;
  onSubmit: (e: FormEvent) => void;
  onFocus: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent) => void;
  onClick: (e: MouseEvent<HTMLParagraphElement>) => void;
}
