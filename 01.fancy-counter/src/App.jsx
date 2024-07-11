import Count from "./Count";
import OpBtn from "./OpBtn";
import ResetBtn from "./ResetBtn";
import Title from "./Title";

function App() {
  // 保存时 Prettier 会自动美化代码，包括添加了小括号（返回多行内容时自动添加）
  return (
    <main>
      <Title />
      <Count />
      <ResetBtn />
      <OpBtn />
    </main>
  );
}

export default App;
