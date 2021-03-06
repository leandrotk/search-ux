import React, {
  memo,
  useCallback,
  useState,
  Fragment,
  FunctionComponent,
} from 'react';

import Skeleton from '@material-ui/lab/Skeleton';

import { ProductType } from 'types/Product';
import {
  useIntersectionObserver,
  IntersectionStatus,
} from '../../hooks/useIntersectionObserver';

import { imageWrapperStyle, imageStyle, skeletonStyle } from './styles';
import { useImageOnLoad, ImageOnLoadType } from './useImageOnLoad';

type ImageUrlType = Pick<ProductType, 'imageUrl' | 'thumbUrl'>;
type ImageAttrType = { imageAlt: string; width?: string };
type ImageStateType = { isLoading: boolean };

export type ImagePropsType = ImageUrlType & ImageAttrType & ImageStateType;

export const Image: FunctionComponent<ImagePropsType> = ({
  imageUrl,
  thumbUrl,
  imageAlt,
  width,
  isLoading,
}) => {
  const [wrapperRef, setWrapperRef] = useState<HTMLDivElement>();
  const wrapperCallback = useCallback(node => {
    setWrapperRef(node);
  }, []);

  const { isIntersecting }: IntersectionStatus = useIntersectionObserver(
    wrapperRef
  );

  const showImageSkeleton: boolean = isLoading || !isIntersecting;

  const {
    handleImageOnLoad,
    imageVisibility,
    imageOpactity,
  }: ImageOnLoadType = useImageOnLoad();

  return (
    <div ref={wrapperCallback} style={imageWrapperStyle}>
      {showImageSkeleton ? (
        <Skeleton
          variant="rect"
          width={width}
          height={imageWrapperStyle.height}
          style={skeletonStyle}
          data-testid="image-skeleton-loader"
        />
      ) : (
        <Fragment>
          <img
            src={thumbUrl}
            alt={imageAlt}
            width={width}
            style={{ ...imageStyle, ...imageVisibility }}
          />
          <img
            onLoad={handleImageOnLoad}
            src={imageUrl}
            alt={imageAlt}
            width={width}
            style={{ ...imageStyle, ...imageOpactity }}
          />
        </Fragment>
      )}
    </div>
  );
};

Image.defaultProps = {
  width: '100%',
};

export default memo(Image);
