export default function NavButton({
  onClick,
  title,
  disabled = undefined,
  children = undefined,
  className = "",
}: {
  onClick: () => void;
  title: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      title={title}
      disabled={disabled}
      tabIndex={0}
      suppressHydrationWarning
      className={
        className +
        " flex w-fit cursor-pointer select-none items-center justify-center text-current outline-none transition-all duration-150 ease-linear hover:text-blue-600 hover:underline focus:text-blue-600 disabled:cursor-default disabled:opacity-50 disabled:hover:text-current  disabled:hover:no-underline disabled:focus:text-current dark:hover:text-blue-400 dark:focus:text-blue-400"
      }
      onClick={onClick}
    >
      {children ? children : title}
    </button>
  );
}
