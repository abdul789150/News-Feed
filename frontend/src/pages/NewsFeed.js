import { useEffect, useState } from 'react';
import NavBar from '../components/navigations/NavBar/NavBar';
import FilledPostCard from '../components/cards/filled/FilledPostCard';
import SimplePostCard from '../components/cards/simple/SimplePostCard';
import IndigoButton from '../components/buttons/IndigoButton/IndigoButton';
import IndigoStart from '../components/headings/IndigoStart/IndigoStart';
import DetailedPostCard from '../components/cards/detailed/DetailedPostCard';
import Footer from '../components/navigations/footer/Footer';
import CategoryService from '../services/Category';
import SourceService from '../services/Source';
import NewsSourceService from '../services/NewsSource';

function NewsFeed() {
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);
  const [articlesData, setArticlesData] = useState([]);
  const [categoryData, categoryItemClicked] = useState(undefined);
  const [articleKeyword, setArticleKeyword] = useState('')

  useEffect(() => {
    populateData();
    getArticlesData();
  }, [])

  useEffect(() => {
    console.log(categoryData)
    searchArticleData()
  }, [categoryData])

  function populateData() {
    CategoryService.getAllCategories().then((response) => {
      const categories = response?.categories
      setCategories(categories?.map((item) => { return {id: item.id, name: item.name}}))
    }).catch((error) => {
      console.log(error)
    });

    SourceService.getAllSources().then((response) => {
      const sources = response?.sources
      setSources(sources?.map((item) => { return {id: item.id, name: item.name}}))
    }).catch((error) => {
      console.log(error)
    });
  }

  function getArticlesData() {
    NewsSourceService.getNewsData().then((response) => {
      console.log(response)
      setArticlesData(response)
    }).catch((error) => {
      console.log(error)
    })
  }

  function searchArticleData(){
    const formData = {}

    if(categoryData) {
      formData.category = categoryData;
    }

    if(articleKeyword !== ''){
      formData.keywords = articleKeyword
    }
    console.log(formData)
    NewsSourceService.searchNewsData(formData).then((response) => {
      console.log(response)
      setArticlesData(response)
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="App relative flex flex-col bg-white text-black">
      <NavBar categories={categories} sources={sources} categoryItemClicked={categoryItemClicked}/>

      {/* Cards */}
      <section className="mt-5 px-10">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-10">
          <div className="w-full lg:w-8/12">
            <FilledPostCard articleData={articlesData[0]} />
          </div>

          <div className="w-full lg:w-[35rem] mt-10 lg:-mt-2 flex sm:hidden lg:flex flex-col space-y-8">
            <h4
              className="text-xl font-medium self-center"
            >
              Most Viewed
            </h4>
            {
              articlesData.slice(2,8)?.map((item, index) => {
                return (
                  <div key={index} className="">
                    <SimplePostCard
                      title={item?.headline}
                      timestamp={item?.posted_date}
                      thumbnail={item?.main_image}
                    />
                  </div>
                );
              })
            }
          </div>
        </div>

        <div className="flex flex-col lg:flex-row mt-20 lg:justify-between lg:space-x-10">
          <div className="w-full lg:w-12/12">
            <IndigoStart
              className="text-3xl font-bold self-start"
              text="Latest Posts"
            />
            <div className="gap-5 w-full flex flex-row flex-wrap mt-10">
              {articlesData?.slice(8)?.map((item, index) => {
                return (
                  <div key={index} className="">
                    <DetailedPostCard {...item} />
                  </div>
                );
              })}              
            </div>
          </div>
        </div>
      </section>
      
      <div className='mt-20'>
        <Footer className={'px-20'} />
      </div>

    </div>
  );
}

export default NewsFeed;
