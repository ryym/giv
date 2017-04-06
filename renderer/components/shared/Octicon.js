import React from 'react';
import octicons from 'octicons';

export default function Octicon({ icon, options = {}, ...props }) {
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
