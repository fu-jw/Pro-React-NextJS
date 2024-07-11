function Title({ locked }) {
  return <h1>{locked ? <span>已达最大值！</span> : "计数器"}</h1>;
}

export default Title;
