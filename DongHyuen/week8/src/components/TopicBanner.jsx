import { useNavigate } from 'react-router-dom'

// 홈페이지에서 각 주제를 보여주는 배너
function TopicBanner({ title, description, path }) {
  const navigate = useNavigate()

  // 클릭하면 해당 페이지로 이동
  const handleClick = () => {
    navigate(path)
  }

  return (
    <div className="banner" onClick={handleClick}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

export default TopicBanner