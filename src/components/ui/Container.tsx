import clsx from "clsx";

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={clsx("mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}
