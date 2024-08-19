export type ButtonProps = {
  name: string;
  onClick: () => void;
};

export const Button = (props: ButtonProps) => {
  return <button onClick={props.onClick}>{props.name}</button>;
};
