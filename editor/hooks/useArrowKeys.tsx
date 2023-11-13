// change current index with arrow keys
// useEffect(() => {
//   const handleKeyDown = (event: KeyboardEvent) => {
//     if (event.key === "ArrowLeft") {
//       setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//     } else if (event.key === "ArrowRight") {
//       setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//     }
//   };
//   window.addEventListener("keydown", handleKeyDown);
//   return () => window.removeEventListener("keydown", handleKeyDown);
// }, [images]);
