import { Helmet } from "react-helmet";
import Hero from "../components/Hero/Hero";
import LatestArticles from "../pages/LatestArticles/LatestArticles";
import icon from '../assets/logo-2.svg'
const Root = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta
          name="description"
          content="Welcome to our blog! We hope you find something that sparks your interest. Here are some of our latest articles. We will be adding more as we continue to write. Stay tuned for more. "
        />
        <meta name="keywords" content="Blog, Article, Latest Articles" />
        <link rel="icon" href={icon} type="image/x-icon" />
        
      </Helmet>
      <Hero />
      <LatestArticles />
    </>
  );
};

export default Root;
