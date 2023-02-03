const SubTitle = ({ subtitile, url='' }) => {
  return (
    <a hrefLang=""f={url}>
      <div className=" scale-0 group-hover:scale-100   hover:text-green-400">
      {subtitile}
      </div>
    </a>
  )
}

export default SubTitle;