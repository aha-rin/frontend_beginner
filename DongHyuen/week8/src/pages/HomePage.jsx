import TopicBanner from '../components/TopicBanner'

function HomePage() {
  return (
    <div className="home-page">
      <h1>웹 개발 기초 학습</h1>
      <p>HTML | CSS | JavaScript</p>

      <div className="banners">
        <TopicBanner
          title="HTML"
          description="웹 페이지의 구조를 만드는 언어"
          path="/html"
        />
        <TopicBanner
          title="CSS"
          description="웹 페이지를 꾸미는 언어"
          path="/css"
        />
        <TopicBanner
          title="JavaScript"
          description="웹 페이지에 기능을 추가하는 언어"
          path="/js"
        />
      </div>
    </div>
  )
}

export default HomePage