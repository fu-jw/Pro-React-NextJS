import Warning from "./Warning";
import { useState } from "react";

export default function Textarea() {
  const [text, setText] = useState("");
  const [showWaring, setShowWaring] = useState(false);
  const [warningText, setWarningText] = useState("");

  const handleChange = (e) => {
    // console.log(e.target.value);
    let newText = e.target.value;
    // 设置之前需要检验内容，防止输入脚本等不安全内容
    if (newText.includes("<script>")) {
      // alert("请不要输入脚本内容");
      setWarningText("请不要输入脚本内容");
      setShowWaring(true);
      newText = newText.replace("<script>", "");
      // setShowWaring(false);
    } else if (newText.includes("@")) {
      setWarningText("非法字符：@");
      setShowWaring(true);
      newText = newText.replace("@", "");
    }

    setText(newText);
  };

  return (
    <div className="textarea">
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="请输入文本内容"
        spellCheck="false"
      />
      {
        // 通过条件渲染来控制是否显示警告
        showWaring ? <Warning warningText={warningText} /> : null
      }
      {/* <Warning warningText={"请不要输入脚本内容"} /> */}
    </div>
  );
}
