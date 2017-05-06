import * as React from 'react';
import octicons, { SVGOptions } from 'octicons';

export type Props = {
  icon: string,
  options?: SVGOptions,
  className: string,
}

export default function Octicon({ icon, options = {}, ...props }: Props) {
  if (!( icon in octicons)) {
    throw new Error(`The icon does not exist: ${icon}`);
  }
  return (
    <div dangerouslySetInnerHTML={{
      __html: octicons[icon].toSVG(options),
    }} {...props}
    />
  );
}
