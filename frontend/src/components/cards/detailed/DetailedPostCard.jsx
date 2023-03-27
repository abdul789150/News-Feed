import PropTypes from 'prop-types';
import {
  getCleanDescription,
  getFormattedDate,
} from '../../../lib/utils';

const DetailedPostCard = ({
  topic,
  headline,
  body,
  posted_date,
  main_image,
  className,
  ...divProps
}) => {

  return (
    // For testing with Storybook, reduce width to w-7/12
      <div
        {...divProps}
        className={`lg:w-[25rem] h-max flex flex-col text-gray-900 ${className}`}
      >
        {/* Image */}
        <div className="overflow-hidden rounded relative h-52 sm:h-[18rem] lg:h-40 w-full sm:w-[36rem] md:w-[18rem]">
          <img src={main_image} alt={headline} layout="fill" quality={100} />
        </div>
        {/* Details */}
        <div className="flex flex-col space-y-3.5 pt-5 md:pt-1 md:w-8/12 lg:w-12/12">
          <div className="text-lg font-medium text-left">
            <h3>
              <span className='capitalize'>{headline}</span>
            </h3>
          </div>
          <div className="flex flex-row justify-between font-medium text-sm w-56">
            <div>
              <span>{getFormattedDate(posted_date)}</span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default DetailedPostCard;

DetailedPostCard.propTypes = {
  topic: PropTypes.object,
  headline: PropTypes.string,
  body: PropTypes.string,
  author: PropTypes.object,
  posted_date: PropTypes.string,
  main_image: PropTypes.string,
};
