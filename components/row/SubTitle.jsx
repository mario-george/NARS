const SubTitle = ({ subtitile, url='' }) => {
  return (
    <Link href={url}>
      <div className=" scale-0 group-hover:scale-100   hover:text-green-400">
      {subtitile}
      </div>
    </Link>
  )
}

export default SubTitle;