import PropTypes from 'prop-types';
import { getFormattedDate } from '../../../lib/utils';

const SimplePostCard = ({
  title,
  timestamp,
  thumbnail,
  articleSlug,
  className,
  ...divProps
}) => {
  return (
    <div
      {...divProps}
      className={`group w-full h-[4rem] flex flex-row text-gray-900 space-x-2.5 ${className}`}
    >
      {/* Image */}
      <div className="overflow-hidden rounded w-3/12 relative">
        <div className={'transition-all ease-in-out duration-1000 group-hover:scale-125'}>
          <img
            src={thumbnail}
            alt={title}
            className='w-full h-full'       
          />
        </div>
      </div>
      {/* Details */}
      <div className="flex flex-col space-y-1 text-sm w-9/12">
        <div className="font-semibold">
          <h4>
            <span
              className='hover:text-indigo-600 cursor-pointer'
            >
              {title}
            </span>
          </h4>
        </div>
        <div className="text-rajah">
          <div>
            <span>{getFormattedDate(timestamp)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplePostCard;

SimplePostCard.propTypes = {
  title: PropTypes.string,
  timestamp: PropTypes.string,
  thumbnail: PropTypes.string,
  articleSlug: PropTypes.string,
};
