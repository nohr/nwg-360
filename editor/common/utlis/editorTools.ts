import { state, working_copy } from "../state";

export const handleClearImages = () => {
  working_copy.images = [];
  working_copy.currentIndex = 0;
};

export const updateStatus = (status: string) => {
  state.status = status;
  let timeout = setTimeout(() => {
    state.status = "";
    clearTimeout(timeout);
  }, 3000);
};
