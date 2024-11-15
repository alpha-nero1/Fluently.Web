import React from 'react'

interface Props {
    spacing: number;
}

export function HorizontalSpacer(props: Props) {
  return (
    <div style={{ width: `${props.spacing}rem` }}/>
  );
}

export function VerticalSpacer(props: Props) {
    return (
      <div style={{ height: `${props.spacing}rem` }}/>
    );
}
  