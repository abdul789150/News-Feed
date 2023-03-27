import { ImWhatsapp } from 'react-icons/im';
import { BsInstagram, BsTwitter } from 'react-icons/bs';

const Footer = ({
  aboutItems,
  navigationItems,
  followItems,
  className,
  ...footerProps
}) => {
  return (
    <footer
      {...footerProps}
      className={`bg-indigo-800 text-white w-full pt-28 lg:pt-36 ${className}`}
    >
      <div
        className={`w-full flex flex-col md:flex-row space-y-8 justify-between pb-36`}
      >
        {/* About */}
        <div>
          <div className="relative">
            <h1 className='text-4xl font-bold'>News Feed</h1>
          </div>

          <div className="flex flex-col space-y-4 lg:space-y-8 mt-8">
            <div>
              <p className="text-gray-300">
                {aboutItems?.address.map((item, index) => {
                  return (
                    <span key={index}>
                      {item} <br />
                    </span>
                  );
                })}
              </p>
            </div>
            <div>
              <h5 className="text-ufo-green text-base font-medium">Phone</h5>
              <a
                className="text-lg font-normal"
                href={`tel:${aboutItems?.phone}`}
              >
                {aboutItems?.phone}
              </a>
            </div>
            <div>
              <h5 className="text-ufo-green text-base font-medium">
                Email Address
              </h5>
              <a
                className="text-lg font-normal"
                href={`mailto:${aboutItems?.email}`}
              >
                {aboutItems?.email}
              </a>
            </div>
          </div>
        </div>
        {/* Navigation */}
        <div>
          <div>
            <h4 className="font-bold text-2xl">Categories</h4>
          </div>
          <div className="flex flex-col space-y-4 mt-4 lg:mt-8 text-ufo-green">
            {navigationItems?.map((element, index) => {
              return (
                <div key={index} id={element.id}>
                  <a href={element.href}>
                    {element.name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        {/* Contact */}
        <div className="flex flex-col space-y-8">
          <div>
            <h4 className="font-bold text-2xl">Follow Us</h4>
          </div>
          <div className="flex flex-row space-x-4">
            {followItems?.map((element, index) => {
              return (
                <a href={`#${element.name}`}>
                  <div
                    key={index}
                    className="bg-charleston-green-dark cursor-pointer rounded-2xl p-3.5"
                  >
                    <div
                      className="relative"
                    >
                      {element.icon}
                    </div>
                  </div>
                </a>
              );
            })}
            <div></div>
          </div>
        </div>
      </div>

      <div className="w-full text-white font-medium text-sm text-center">
        <hr className="border-top border-gray-100" />
        <div className="py-5">All rights reserved © 2023 NewsFeed</div>
      </div>
    </footer>
  );
};

Footer.defaultProps = {
  aboutItems: {
    logo: '/atilax.png',
    address: [
    ],
    phone: '+90********',
    email: 'abdul789150@gmail.com',
  },
  navigationItems: [
    { id: 'home', name: 'Home', href: '/' },
    { id: 'about', name: 'About Us', href: '/#about_us' },
    {
      id: 'contact',
      name: 'Contact Us',
      href: '/#contact',
    },
  ],
  followItems: [
    {
      name: 'facebook',
      icon: <BsInstagram style={{ width: 20, height: 20 }}/>
    },
    {
      name: 'whatsapp',
      icon: <ImWhatsapp style={{ width: 20, height: 20 }}/>
    },
    {
      name: 'twitter',
      icon: <BsTwitter style={{ width: 20, height: 20 }}/>
    }
  ],
};

Footer.propTypes = {};

export default Footer;
