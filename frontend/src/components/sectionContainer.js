import classNames from 'classnames';
import { MDBContainer } from 'mdbreact';
import React, { Fragment } from 'react';

const SectionContainer = ({
   number,
   children,
   className,
   dark,
   description,
   header,
   noBorder,
   noBottom,
   style,
   title,
   flexCenter,
   flexCenterVert,
   flexColumn,
}) => {
   const classes = classNames(
      'section',
      !noBottom && 'mb-5',
      !noBorder ? 'border p-3' : 'px-0',
      dark && 'grey darken-3',
      flexCenter && 'd-flex justify-content-center align-items-center',
      flexCenterVert && 'd-flex align-items-center',
      flexColumn && 'flex-column',
      className
   );

   description = description ? <p>{description}</p> : '';
   title = title ? <h2 className="mb-3">{title}</h2> : '';
   header = header ? <h4 className="mb-2">{header}</h4> : '';

   return (
      <Fragment>
         {title}
         {header}
         <MDBContainer fluid key={number} className={classes} style={style}>
            {description}
            {children}
         </MDBContainer>
      </Fragment>
   );
};

export default SectionContainer;
