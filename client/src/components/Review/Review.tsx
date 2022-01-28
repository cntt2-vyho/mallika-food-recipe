import React, { ReactChild, ReactChildren } from 'react';
import {
  Heart24Regular,
  MoreVertical24Filled,
  Star12Filled,
} from '@fluentui/react-icons';
import cx from 'clsx';
import { generateBase64Image, getFullDateTime } from '@helpers/helpers';

interface RecipeType {
  image: string;
  title: string;
}

interface ReviewUserType {
  avatar: object;
  name: string;
}

interface ReviewListProps {
  className?: string;
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
}

interface ReviewProps {
  className?: string;
  rating: number;
  comment: string;
  createdAt: Date;
  user: ReviewUserType;
}

interface MyReviewProps {
  className?: string;
  recipe: RecipeType;
  comment: string;
}

export const ReviewList: React.FC<ReviewListProps> = ({
  className,
  children,
}) => {
  const defaultClassName = 'flex flex-col items-stretch';
  const allClassNames = cx(defaultClassName, className);

  return <ul className={allClassNames}>{children}</ul>;
};

export const Review: React.FC<ReviewProps> = ({
  className,
  rating,
  comment,
  createdAt,
  user,
}) => {
  const defaultClassName = 'px-layout py-3';
  const allClassNames = cx(defaultClassName, className);

  return (
    <li className={allClassNames}>
      <div className='flex gap-2'>
        <div className='relative w-8 h-8 flex-shrink-0 mt-1 rounded-full overflow-hidden'>
          <img
            src={generateBase64Image(user.avatar)}
            className='absolute w-full h-full object-cover'
            alt={user.name}
          />
        </div>
        <div className='w-full'>
          <div className='flex justify-between items-center pb-1'>
            <h3 className='text-sm font-semibold'>{user.name}</h3>
            <button className='flex-shrink-0 text-gray-600 -mr-2'>
              <MoreVertical24Filled />
            </button>
          </div>
          <div className='flex gap-0.5 -mt-1.5 pb-1'>
            {[...Array(5).keys()].map((_, index) => {
              return (
                <Star12Filled
                  key={index}
                  className={
                    index + 1 <= rating ? 'text-orange' : 'text-gray-400'
                  }
                />
              );
            })}
          </div>
          <p className='text-sm'>{comment}</p>
          <p className='text-xs text-gray-500'>{getFullDateTime(createdAt)}</p>
        </div>
      </div>
    </li>
  );
};

export const MyReview: React.FC<MyReviewProps> = ({
  className,
  recipe,
  comment,
}) => {
  const defaultClassName = 'px-layout py-3 border-b border-gray-400';
  const allClassNames = cx(defaultClassName, className);

  return (
    <li className={allClassNames}>
      <div className='flex gap-2'>
        <div className='relative w-12 h-12 flex-shrink-0 mt-1 rounded-lg overflow-hidden'>
          <img
            src={recipe.image}
            className='absolute w-full h-full object-cover'
            alt={recipe.title}
          />
        </div>
        <div className='w-full'>
          <div className='flex justify-between items-center pb-1'>
            <h3 className='text-gray-800 text-xs pr-2'>{recipe.title}</h3>
            <div className='flex gap-1 w-14 flex-shrink-0'>
              <button className='text-gray-600'>
                <Heart24Regular />
              </button>
              <button className='text-gray-600'>
                <MoreVertical24Filled />
              </button>
            </div>
          </div>
          <p className='leading-5'>{comment}</p>
        </div>
      </div>
    </li>
  );
};
