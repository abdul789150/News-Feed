import PropTypes from 'prop-types';
import { getFormattedDate } from '../../../lib/utils';

const FilledPostCard = ({ articleData, className, ...divProps }) => {
  return (
    <div
      {...divProps}
      className={`group w-full z-0 text-gray-900 cursor-pointer ${className}`}
    >
      <div className="overflow-hidden rounded-lg border relative z-0 w-full h-96 md:h-[30rem] lg:h-[34rem] xl:h-[38rem]">
        <div className="w-full h-full opacity-50 transition-all ease-in-out duration-1000 group-hover:scale-125">
          <img
            src={articleData?.main_image}
            alt={articleData?.headline}
            className='w-full h-full'
          />
        </div>

        <div className="absolute z-10 bottom-4 md:bottom-8 lg:bottom-14 ml-3 md:ml-5 lg:ml-8">
          <div className="flex flex-col space-y-3 pt-1">
            <div className="w-[45rem]">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold cursor-pointer">
                <span>
                  {articleData?.headline}
                </span>
              </h1>
            </div>
            <div className="flex flex-col justify-between font-medium text-sm w-max cursor-default">
              <div>
                <span>{getFormattedDate(articleData?.posted_date)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilledPostCard;

FilledPostCard.propTypes = {
  articleData: PropTypes.object,
};
